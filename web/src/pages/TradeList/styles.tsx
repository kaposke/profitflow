import styled from 'styled-components';
import { FadeInFromBelow, UpAndDown } from '../../styles/animations';
import Modal from '../../components/Modal';

export const Container = styled.div`
  animation: ${FadeInFromBelow} 0.5s ease-out;

  > * {
    margin-bottom: 1.5rem;
  }

  button {
    width: 100%;
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
  .day-card {
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      text-transform: capitalize;
    }

    .profit {
      font-size: 2rem;
      font-weight: bold;
    }
  }

  .trade-day {
    > * {
      margin-bottom: 1rem;
    }
  }

  > * {
    margin-bottom: 2rem;
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

export const StyledModal = styled(Modal)`
  width: 100%;
  max-width: 45rem;

  p {
    margin: 1rem 0 2.5rem 0;
  }
  
  .modal-buttons {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    button:first-of-type {
      /* color: ${props => props.theme.colors.textDark};
      background: ${props => props.theme.colors.textLight}; */
      margin-right: 1rem;
    }

    .danger {
      background: ${props => props.theme.colors.red};
    }
  }
`;