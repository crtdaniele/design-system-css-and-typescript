export enum BreakpointsEnum {
  xs = "--breakpoint-xs",
  sm = "--breakpoint-sm",
  md = "--breakpoint-md",
  lg = "--breakpoint-lg",
  xl = "--breakpoint-xl"
}

export type Breakpoints = keyof typeof BreakpointsEnum;