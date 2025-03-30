export enum FontSizesEnum {
  xs = "--font-size-xs",
  sm = "--font-size-sm",
  md = "--font-size-md",
  lg = "--font-size-lg",
  xl = "--font-size-xl"
}

export type FontSizes = keyof typeof FontSizesEnum;