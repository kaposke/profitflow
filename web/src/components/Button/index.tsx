import React from 'react';

import { CustomButton } from './styles';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: JSX.Element;
}

const Button: React.FC<Props> = ({ children, icon, ...buttonProps }) => {
  return (
    <CustomButton {...buttonProps}>{children}{icon}</CustomButton>
  );
}

export default Button;
