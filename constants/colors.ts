export const COLORS = {
  darkGreen: '#283618',
  oliveGreen: '#606C38',
  cream: '#FEFAE0',
  tan: '#DDA15E',
  rust: '#BC6C25',
} as const;

export type ColorName = keyof typeof COLORS;