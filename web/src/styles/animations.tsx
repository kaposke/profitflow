import { keyframes } from 'styled-components';

export const FadeInFromBelow = keyframes`
    0% {
      opacity: 0;
      transform: translateY(5rem);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
`;

export const UpAndDown = keyframes`
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(-1rem);
    }
`;
