import { OKlabColor } from "./oklab-palette-gen";
import { ThemeStrategy } from "./types";
import prand from 'pure-rand';

const oklabTriadic: ThemeStrategy<OKlabColor> = {
  name: 'oklab triadic',
  apply: (palette) => {
    return {
      primary: palette[0][0],
      primaryAlt: palette[1][1],
      secondary: palette[0][3],
      secondaryAlt: palette[1][4],
      tertiary: palette[0][7],
      tertiaryAlt: palette[1][8],
      quaternary: palette[0][10],
      quaternaryAlt: palette[1][11],
      background: palette[5][0],
      dark: palette[3][0],
    };
  }
}

const oklabRandom: ThemeStrategy<OKlabColor> = {
  name: 'oklab random',
  apply: (palette, seed) => {
    const len = palette[0].length - 1;
    const rng = prand.xoroshiro128plus(seed);
    // TODO: improve this so it can't repeat colors
    return {
      primary: palette[0][prand.unsafeUniformIntDistribution(0, len, rng)],
      primaryAlt: palette[1][prand.unsafeUniformIntDistribution(0, len, rng)],
      secondary: palette[0][prand.unsafeUniformIntDistribution(0, len, rng)],
      secondaryAlt: palette[1][prand.unsafeUniformIntDistribution(0, len, rng)],
      tertiary: palette[0][prand.unsafeUniformIntDistribution(0, len, rng)],
      tertiaryAlt: palette[1][prand.unsafeUniformIntDistribution(0, len, rng)],
      quaternary: palette[0][prand.unsafeUniformIntDistribution(0, len, rng)],
      quaternaryAlt: palette[1][prand.unsafeUniformIntDistribution(0, len, rng)],
      background: palette[5][prand.unsafeUniformIntDistribution(0, len, rng)],
      dark: palette[3][prand.unsafeUniformIntDistribution(0, len, rng)],
    };
  }
}

export const oklabStrategies: ThemeStrategy<OKlabColor>[] = [
  oklabTriadic,
  oklabRandom,
];
