import React from 'react';

import { CustomButton } from './styles';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: JSX.Element;
  iconPosition?: "left" | "right";
}

const Button: React.FC<Props> = ({ children, icon, iconPosition = 'right', ...buttonProps }) => {

  if (iconPosition === 'left')
    return (
      <CustomButton iconPosition={iconPosition} {...buttonProps}>{icon}{children}</CustomButton>
    );
  else
    return (
      <CustomButton iconPosition={iconPosition} {...buttonProps}>{children}{icon}</CustomButton>
    );

}

export default Button;
