<template>
  <div class="theme-gen">
    <v-row style="height: 3.5rem;">
      <v-col style="padding-bottom: 0;">
        <h1 :style="`background-color: ${baseHsl}`" :class="{ dark: basePerceivedLightness >= 0.6 }">Palette Gen</h1>
      </v-col>
      <v-col :cols="3" class="slider">
        <v-slider label="Hue" :min="0" :max="360" v-model="baseHue" :color="baseHueHsl"></v-slider>
      </v-col>
      <v-col :cols="3" class="slider">
        <v-slider label="Saturation" :min="0" :max="100" v-model="baseSat" :color="baseHsl"></v-slider>
      </v-col>
      <v-col :cols="3" class="slider">
        <v-slider label="Strategy" :ticks="strategies.map(s => s.name)" step="1" :min="0" :max="strategies.length - 1"
          v-model="strategy"></v-slider>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-tabs v-model="tab" bg-color="primary">
            <v-tab value="code">Code Editor</v-tab>
            <v-tab value="palette">Full Palette</v-tab>
          </v-tabs>

          <v-card-text>
            <v-window v-model="tab">
              <v-window-item value="code">
                <code-display :theme="theme"></code-display>
              </v-window-item>

              <v-window-item value="palette">
                <template v-if="strategies[strategy].name.startsWith('oklab')">
                  <h2>OKLab</h2>
                  <palette-display :palette="fullPaletteOklab"></palette-display>
                </template>
                <template v-if="strategies[strategy].name.startsWith('hsl')">
                  <h2>HSL</h2>
                  <palette-display :palette="fullPaletteHsl"></palette-display>
                </template>
              </v-window-item>
            </v-window>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import * as oklab from 'oklab.ts';
import colorsea from 'colorsea'
import prand from 'pure-rand';
import { ref, computed, watch, onBeforeMount } from 'vue';
import { OklabPaletteGen } from '../lib/oklab-palette-gen';
import { HslPaletteGen } from '../lib/hsl-palette-gen';
import PaletteDisplay from './PaletteDisplay.vue';
import CodeDisplay from './CodeDisplay.vue';
import { oklabStrategies } from '../lib/oklab-theme-strategies';

// const strategyNames = [
//   'oklab triadic',
//   'oklab major scale',
//   'oklab minor scale',
//   'oklab random',
//   'hsl triadic',
//   'hsl major scale',
//   'hsl minor scale',
//   'hsl split complementary',
//   'hsl random',
// ];
const strategies = oklabStrategies;
const strategy = ref(0);
const currentStrategy = computed(() => {
  return strategies[strategy.value];
});

const tab = ref(null);
const seed = ref(0);

const baseHue = ref(Math.random() * 360);
const baseSat = ref(28);

const baseHsl = computed(() => {
  return `hsl(${baseHue.value}deg, ${baseSat.value}%, 50%)`;
});
const baseHueHsl = computed(() => {
  return `hsl(${baseHue.value}deg, 100%, 50%)`;
});
const baseRgb = computed(() => {
  return colorsea.hsl(baseHue.value, baseSat.value, 50);
});
const basePerceivedLightness = computed(() => {
  const okl = oklab.rgb_to_oklab({
    r: baseRgb.value.red(),
    g: baseRgb.value.green(),
    b: baseRgb.value.blue()
  });
  return okl.L;
});

let pushStateTimer: number | undefined = undefined;
watch([baseHue, baseSat, strategy, seed], () => {
  clearTimeout(pushStateTimer);
  pushStateTimer = setTimeout(() => {
    history.pushState({
      hue: baseHue.value,
      sat: baseSat.value,
      seed: seed.value,
      strat: strategy.value,
    }, "title 1", `?hue=${baseHue.value}&sat=${baseSat.value}&strat=${strategy.value}&seed=${seed.value}`);
  }, 100);
});

onBeforeMount(() => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const params = Object.fromEntries(urlSearchParams.entries());
  if (params.hue) {
    const hue = Number.parseFloat(params.hue);
    if (!Number.isNaN(hue) && hue >= 0 && hue <= 360) {
      baseHue.value = hue;
    }
  }
  if (params.sat) {
    const sat = Number.parseFloat(params.sat);
    if (!Number.isNaN(sat) && sat >= 0 && sat <= 100) {
      baseSat.value = sat;
    }
  }
  if (params.strat) {
    const strat = Number.parseInt(params.strat);
    if (!Number.isNaN(strat) && strat >= 0 && strat <= strategies.length) {
      strategy.value = strat;
    }
  }
  if (params.seed) {
    const s = Number.parseFloat(params.seed);
    if (!Number.isNaN(s)) {
      seed.value = s;
    }
  }
  if (seed.value == 0) {
    const rng = prand.xoroshiro128plus(42);
    seed.value = prand.unsafeUniformIntDistribution(1, 100, rng);
  }
});

const fullPaletteOklab = computed(() => {
  return OklabPaletteGen.generateFullPalette(baseRgb.value.red(), baseRgb.value.green(), baseRgb.value.blue());
});

const fullPaletteHsl = computed(() => {
  return HslPaletteGen.generateFullPalette(baseHue.value, baseSat.value, 50);
});

const theme = computed(() => {
  return currentStrategy.value.apply(fullPaletteOklab.value, seed.value);
});
</script>

<style scoped>
.theme-gen {
  padding: 1rem;
}

h1 {
  margin: 0;
  font-weight: 300;
  display: inline-block;
  padding: 5px 15px;
}

h1.dark {
  color: #242424;
}

#color-box {
  display: inline-block;
  height: 30px;
  width: 60px;
  margin-left: 2rem;
}

.palette-box {
  display: inline-block;
  width: 100px;
  height: 100px;
  margin-right: 1rem;
  margin-bottom: 0.5rem;
}

.v-col.slider {
  padding-top: 1.25rem;
  padding-bottom: 0;
}

.v-slide-group {
  background-color: #141414;
}
</style>