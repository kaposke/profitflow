import React from 'react';

import { Container } from './styles';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: JSX.Element;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, Props>(({ children, icon, error, ...inputProps }, ref) => {
  return (
    <Container icon={!!icon} error={!!error}>
      <div>
        <input {...inputProps} ref={ref}/>
        {icon}
      </div>
      <span>{error}</span>
    </Container>
  );
});

export default Input;