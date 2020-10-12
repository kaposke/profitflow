import styled, { css } from 'styled-components';
import { darken } from 'polished';

export const CustomButton = styled.button<{iconPosition: 'left' | 'right'}>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 10rem;

  padding: 1rem;
  background: ${ props => props.theme.colors.green };

  color: ${ props => props.theme.colors.textLight };
  border: 0;
  border-radius: ${ props => props.theme.borderRadius };
  box-shadow: ${ props => props.theme.boxShadow };
  transition: 0.2s;
  cursor: pointer;
  
  &:hover {
    background: ${ props => darken(0.03, props.theme.colors.green)};
  }

  svg {
    margin-left: ${ props => props.iconPosition === 'right' ? '1rem' : 0};
    margin-right: ${ props => props.iconPosition === 'left' ? '1rem' : 0};
  }
`;