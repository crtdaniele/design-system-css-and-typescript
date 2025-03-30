export enum FontFamiliesEnum {
  primary = "--font-family-primary",
  secondary = "--font-family-secondary"
}

export type FontFamilies = keyof typeof FontFamiliesEnum;