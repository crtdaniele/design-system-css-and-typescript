export enum ColorsEnum {
  primary = "--color-primary",
  secondary = "--color-secondary",
  background = "--color-background"
}

export type Colors = keyof typeof ColorsEnum;