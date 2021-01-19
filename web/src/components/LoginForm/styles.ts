import styled from 'styled-components';
import { lighten } from 'polished';
import { FadeInFromBelow } from '../../styles/animations';

export const Container = styled.div`
  width: 100%;
  max-width: 50rem;

  animation: ${FadeInFromBelow} 0.5s ease-out;

  p {
    margin-top: 1rem;
    text-align: center;
  }

  @media(min-width: 1024px) {
    max-width: 40rem;
  }
`;

export const FormContainer = styled.div`
  width: 100%;
  background: ${props => props.theme.colors.card};
  padding: 3rem;
  border-radius: ${ props => props.theme.borderRadius};
  box-shadow: ${ props => props.theme.boxShadow};

  .logo {
    margin-bottom: 2rem;
    font-size: 3rem;
  }

  h2 {
    margin-bottom: 1rem;
    text-align: center;
    color: ${props => props.theme.colors.text}
  }

  button {
    width: 100%;
  }
`;

export const Form = styled.form`

  .field {
    label {
      display: block;
    }

    margin-bottom: 1.5rem;
  }
`;

export const ErrorMessage = styled.div`
  padding: 1rem;
  text-align: center;
  margin: 1rem 0;
  background-color: ${ props => lighten(0.13, props.theme.colors.red)};
  color: ${ props => props.theme.colors.textLight };
  border-radius: 1rem;
`;

