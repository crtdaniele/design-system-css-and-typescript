export enum SpacingEnum {
  xxs = "--spacing-xxs",
  xs = "--spacing-xs",
  sm = "--spacing-sm",
  md = "--spacing-md",
  lg = "--spacing-lg",
  xl = "--spacing-xl",
  xxl = "--spacing-xxl"
}

export type Spacing = keyof typeof SpacingEnum;