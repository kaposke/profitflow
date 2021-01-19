import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string,
      backgroundInverted: string,
      card: string,
      cardInverted: string,
      text: string,
      textFaint: string,
      textFaintInverted: string,
      textLight: string,
      textDark: string,
      textInverted: string,
      green: string,
      red: string,
      linkColor: string,
    },
    borderRadius: string,
    boxShadow: string,
  }
}