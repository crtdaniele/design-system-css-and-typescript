export enum ShadowsEnum {
  sm = "--shadow-sm",
  md = "--shadow-md",
  lg = "--shadow-lg"
}

export type Shadows = keyof typeof ShadowsEnum;