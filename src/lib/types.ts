export interface Color<A> {
  displayCss: string;
  renderCss: string;
  type: 'oklab' | 'hsl';
  raw: A;
}

export type Palette<A> = Color<A>[][];

export interface Theme<A> {
  primary: Color<A>;
  primaryAlt: Color<A>;
  secondary: Color<A>;
  secondaryAlt: Color<A>;
  tertiary: Color<A>;
  tertiaryAlt: Color<A>;
  quaternary: Color<A>;
  quaternaryAlt: Color<A>;
  background: Color<A>;
  dark: Color<A>;
}

export interface ThemeStrategy<A> {
  name: string;
  apply: (palette: Palette<A>, seed: number) => Theme<A>;
}