import styled, { css } from 'styled-components';
import Button from '../Button';
import { darken } from 'polished';

export const Container = styled.div`
  
`;

export const Form = styled.form`
  > * {
    margin-bottom: 2rem;
  }

  .action-buttons {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 1rem;
  }

  .action-error {
    text-align: center;
    color: ${props => props.theme.colors.red};
    margin-top: 0rem;
  }

  .group {
    width: 100%;
    display: flex;
    flex-direction: column;
    > * {
      margin-bottom: 1rem;
    }
  }

  .field {
    width: 100%;
  }

  @media(min-width: 700px) {
    display: grid;
    grid-template-columns: ;

    .group {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 1rem;
    }
  }
`;

interface ButtonProps {
  selected?: boolean;
}

export const SelectableButton = styled(Button) <ButtonProps>`
  ${props => !props.selected && css`
    box-shadow: 0 0 0;
    opacity: 0.5;
  `}
`;

export const BuyButton = styled(SelectableButton) <ButtonProps>`
  background: ${props => props.theme.colors.green};
  color: ${props => props.theme.colors.textLight};
`;

export const SellButton = styled(SelectableButton) <ButtonProps>`
  background: ${props => props.theme.colors.red};
  color: ${props => props.theme.colors.textLight};

  &:hover {
    background: ${ props => darken(0.03, props.theme.colors.red)};
  }
`;