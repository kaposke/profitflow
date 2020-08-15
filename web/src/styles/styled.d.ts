import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string,
      card: string,
      text: string,
      textFaint: string,
      textLight: string,
      textDark: string,
      green: string,
      red: string,
      linkColor: string,
    },
    borderRadius: string,
    boxShadow: string,
  }
}