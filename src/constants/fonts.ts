export const Fonts = {
  black: 'Mulish-Black',
  bold: 'Mulish-Bold',
  extraBold: 'Mulish-ExtraBold',
  extraLight: 'Mulish-ExtraLight',
  light: 'Mulish-Light',
  medium: 'Mulish-Medium',
  regular: 'Mulish-Regular',
  semiBold: 'Mulish-SemiBold',
} as const;

export type FontType = keyof typeof Fonts;
