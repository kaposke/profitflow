import { createGlobalStyle } from 'styled-components';
import { darken } from 'polished';

import 'react-toastify/dist/ReactToastify.css';

export const GlobalStyle = createGlobalStyle`
  :root {
    font-size: 60%;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    transition: background-color 0.2s;
  }
  html, body, #root {
    height: 100vh;
  }

  body {
    background: ${ props => props.theme.colors.background};
    -webkit-font-smoothing: antialiased;
  }

  #root {
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }

  body, input, button, textarea {
    font: 500 1.6rem Poppins;
    color: ${ props => props.theme.colors.text};
  }

  input, textarea { 
    width: 100%;
    border-radius: ${ props => props.theme.borderRadius};
    border: 0;
    padding: 1rem;
    background: ${props => props.theme.colors.background};
  }
  
  label {
    display: block;
    width: 100%;
    margin-bottom: 0.5rem;
  }

  a {
    text-decoration: none;
    color: ${props => props.theme.colors.linkColor};
    transition: 0.2s;

    &:hover {
      color: ${props => darken(0.03, props.theme.colors.linkColor)};
    }
  }
  

  @media(min-width: 700px) {
    #root {
      font-size: 90%;
    }
  }

  .red {
    color: ${ props => props.theme.colors.red};
  }

  .green {
    color: ${ props => props.theme.colors.green};
  }

  .Toastify__toast--success {
    background: ${props => props.theme.colors.green};
  }

  .Toastify__toast--error {
    background: ${props => props.theme.colors.red};
  }

  /** Used to define container behavior: width, position: fixed etc... **/
  .Toastify__toast-container {
    font-family: Poppins;
    text-align: center;
    width: 30rem;
  } 

  .Toastify__toast {
    
    border-radius: ${props => props.theme.borderRadius}
  }
`;