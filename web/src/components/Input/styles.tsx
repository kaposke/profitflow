import styled, { css } from 'styled-components';

export const Container = styled.div<{ icon: boolean, error: boolean }>`
  position: relative;

  div {
    input {
      ${props => props.icon && css`padding-left: 4.5rem`};
      
      ${props => props.error && css`border: 1px solid ${props.theme.colors.red}`};
    }

    svg {
      color: ${props => props.theme.colors.textFaint};
      position: absolute;
      top: 0;
      left: 0;
      width: 4.5rem;
      height: 4.5rem;
      padding: 1.1rem;
    }
  }

  span {
    margin-top: 1rem;
    color: ${props => props.theme.colors.red};
  }
`;
