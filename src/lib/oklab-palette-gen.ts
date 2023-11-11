import * as oklab from 'oklab.ts';
import { Color, Palette } from './types';

export type OKlabColor = oklab.oklab;

export class OklabPaletteGen {
  static generateFullPalette(r: number, g: number, b: number, count: number = 12): Palette<OKlabColor> {
    const root = oklab.rgb_to_oklab({ r, g, b });
    return [
      this.generateRow(root, count, root.L * 1.4),
      this.generateRow(root, count, root.L * 1.2),
      this.generateRow(root, count, root.L),
      this.generateRow(root, count, root.L * 0.8),
      this.generateRow(root, count, root.L * 0.6),
      this.generateRow(root, count, 0.075),
    ];
  }

  static generateRow(base: OKlabColor, count: number, lightness: number) {
    const factor = 1 / count;
    const TWO_PI = Math.PI * 2;

    return new Array(count).fill(0).map((_, i) => {
      let a = base.a;
      let b = base.b;

      if (i != 0) {
        a = base.a * Math.cos(TWO_PI * (factor * i));
        b = base.b * Math.sin(TWO_PI * (factor * i));
      }

      // round to a reasonable decimal point
      const L = Math.round(lightness * 10000) / 10000;
      a = Math.round(a * 10000) / 10000;
      b = Math.round(b * 10000) / 10000;

      const raw = { L, a, b };
      const color: Color<OKlabColor> = {
        renderCss: oklab.oklab_to_css_string(raw),
        displayCss: `oklab(${Math.round(L * 100000) / 1000}% ${a} ${b})`,
        raw,
        type: 'oklab'
      };
      return color;
    });
  }
}