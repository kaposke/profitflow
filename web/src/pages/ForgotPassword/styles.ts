import styled from 'styled-components';

import Card from '../../components/AppCard';
import { FadeInFromBelow } from '../../styles/animations';

export const Container = styled.div`
  width: 100%;
  max-width: 50rem;
  padding: 0 2rem;

  animation: ${FadeInFromBelow} 0.5s ease-out;

  p {
    margin: 1rem 0;
    text-align: center;
  }

  button {
    width: 100%;
  }

  .field {
    margin-bottom: 1.5rem;
  }

  @media(min-width: 1024px) {
    /* max-width: 40rem; */
  }
`;

export const AppCard = styled(Card)`
  padding: 3rem;
`;
