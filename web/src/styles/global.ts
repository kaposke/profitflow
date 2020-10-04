import { createGlobalStyle } from 'styled-components';
import { darken } from 'polished';

import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';

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

  .react-datepicker-wrapper {
    width: 100%;
  }
  
  .react-datepicker {
    font-size: 1em;
    background: ${props => props.theme.colors.card};
    color: ${props => props.theme.colors.text};
    border: 0;
    box-shadow: ${props => props.theme.boxShadow};
  }

  .react-datepicker__triangle {
    display: none;
  }

  .react-datepicker__header {
    padding-top: 0.8em;
    background: ${props => props.theme.colors.background};
  }

  .react-datepicker__month {
    margin: 0.4em 1em;
  }

  .react-datepicker__day-name, .react-datepicker__day {
    width: 1.9em;
    line-height: 1.9em;
    margin: 0.166em;
    color: ${props => props.theme.colors.text};
  }

  .react-datepicker__current-month {
    font-size: 1em;
    color: ${props => props.theme.colors.text};
  }

  .react-datepicker__navigation {
    top: 1em;
    line-height: 1.7em;
    border: 0.45em solid transparent;
    width: 0 !important;
  }

  .react-datepicker__navigation--previous {
    border-right-color: ${props => props.theme.colors.text};
    left: 1em;
  }

  .react-datepicker__navigation--next {
    border-left-color: ${props => props.theme.colors.text};
    right: 1em;
  }

  .react-datepicker__day:hover {
    color: ${props => props.theme.colors.textDark};
  }

  .react-datepicker__input-time-container .react-datepicker-time__input-container .react-datepicker-time__input input {
    width: 100%;
  }

  .react-datepicker__day--selected  {
    background-color: ${props => props.theme.colors.green} !important;
  }

  .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box ul.react-datepicker__time-list li.react-datepicker__time-list-item {
    color: red;
    background: blue;
  }
`;