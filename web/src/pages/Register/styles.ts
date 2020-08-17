import styled from 'styled-components';
import { FadeInFromBelow } from '../../styles/animations';

export const Container = styled.div`
  width: 100%;
  max-width: 44rem;
  padding: 0 2rem;

  animation: ${FadeInFromBelow} 0.5s ease-out;

  p {
    margin-top: 1rem;
    text-align: center;
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
`;

export const Form = styled.form`

  .field {
    label {
      display: block;
    }

    margin-bottom: 1.5rem;
  }
`;

