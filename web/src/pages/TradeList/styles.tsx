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
  padding-bottom: 3rem;
  .month {
    margin-bottom: 2rem; // month separation
  }

  .days {
    padding-left: 2rem;

    .day {
      margin-top: 1rem; // day separation
      
      .trades {
        padding-left: 2rem;

        > * {
          margin-top: 1rem;
        }
      }
    }
  }

  .group-card {
    display: flex;
    flex-direction: horizontal;
    align-items: center;
    justify-content: space-between;

    font-size: 1.8rem;
  }

  .trade-count {
    margin-right: 2rem;
    font-size: 1.5rem;
  }

  .profit {
    font-weight: bold;
    font-size: 2rem;
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