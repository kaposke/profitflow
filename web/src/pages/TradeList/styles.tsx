import styled from 'styled-components';
import { FadeInFromBelow, UpAndDown } from '../../styles/animations';

export const Container = styled.div`
  animation: ${FadeInFromBelow} 0.5s ease-out;

  > * {
    margin-bottom: 1.5rem;
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    cursor: pointer;
    width: 2rem;
    height: 2rem;
  }
`;

export const Trades = styled.div`
  > * {
    margin-bottom: 1rem;
  }
`;

export const NoTradesContainer = styled.div`
  text-align: center;

  svg {
    width: 3rem;
    height: 3rem;
    color: ${props => props.theme.colors.green};

    animation: ${UpAndDown} 0.7s alternate infinite ease-out;
  }
`;