import { Color, Palette } from './types';

type HslColor = [number, number, number];

export class HslPaletteGen {
  static generateFullPalette(h: number, s: number, l: number, count: number = 12): Palette<HslColor> {
    const root: HslColor = [h, s, l];
    return [
      this.generateRow(root, count, root[2] * 1.5),
      this.generateRow(root, count, root[2] * 1.3),
      this.generateRow(root, count, root[2]),
      this.generateRow(root, count, root[2] * 0.65),
      this.generateRow(root, count, root[2] * 0.45),
      this.generateRow(root, count, 3),
    ];
  }

  static generateRow(base: HslColor, count: number, lightness: number) {
    const factor = 360 / count;

    return new Array(count).fill(0).map((_, i) => {
      let h = this.wrap(base[0] + factor * i);
      const raw: HslColor = [h, base[1], lightness];

      // round to a reasonable decimal point
      raw[0] = Math.round(raw[0] * 1000) / 1000;
      raw[1] = Math.round(raw[1] * 1000) / 1000;
      raw[2] = Math.round(raw[2] * 1000) / 1000;

      const css = `hsl(${raw[0]}deg, ${raw[1]}%, ${raw[2]}%)`;

      const color: Color<HslColor> = {
        renderCss: css,
        displayCss: css,
        raw,
        type: 'hsl'
      };
      return color;
    });
  }

  private static wrap(hue: number): number {
    if (hue > 360) {
      return this.wrap(hue - 360);
    }
    return hue;
  }
}