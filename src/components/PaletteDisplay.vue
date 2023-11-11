<template>
  <div>
    <v-row v-for="row, i of props.palette" :key="i">
      <v-col v-for="color of row" :key="color.displayCss">
        <v-btn size="large" block rounded="0" :style="`background-color: ${color.renderCss}`"
          @mouseover="previewColor = color" @mouseleave="previewColor = undefined" @click="onPaletteClick(color)"
          :class="{ selected: selectedColor && color.displayCss == selectedColor.displayCss }"></v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-if="displayColor">
        <div>
          <pre>{{ displayColor.displayCss }}</pre>
        </div>
        <div>
          <pre>{{ displayColor.raw }}</pre>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Color } from '../lib/types';

const previewColor = ref();
const selectedColor = ref();
const displayColor = computed(() => {
  if (selectedColor.value != undefined) {
    return selectedColor.value;
  } else if (previewColor.value != undefined) {
    return previewColor.value;
  }
});

const props = defineProps<{
  palette: Color<any>[][]
}>();

function onPaletteClick(color: Color<any>) {
  if (selectedColor.value && selectedColor.value.displayCss == color.displayCss) {
    selectedColor.value = undefined;
  } else {
    selectedColor.value = color;
  }
}
</script>

<style scoped>
.box {
  margin-right: 1rem;
  margin-bottom: 0.5rem;
}

.selected {
  border: solid 2px white;
}
</style>