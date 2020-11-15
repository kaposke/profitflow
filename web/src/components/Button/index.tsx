import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components'

import { CustomButton } from './styles';
import { ClassicSpinner } from 'react-spinners-kit'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: JSX.Element;
  iconPosition?: "left" | "right";
  loading?: boolean;
  loadingMessage?: string;
}

const Button: React.FC<Props> = ({ children, icon, iconPosition = 'right', loading = false, loadingMessage='Loading', ...buttonProps }) => {
  const themeContext = useContext(ThemeContext);

  return (
    <CustomButton
      iconPosition={iconPosition}
      disabled={loading}
      {...buttonProps}
    >
      {
        loading ? (
          <>
            <span>{loadingMessage}</span>
            <ClassicSpinner color={themeContext.colors.textLight} size={16}/>
          </>
        ) : (
          <>
            { iconPosition === 'left' && icon}
            {children}
            { iconPosition === 'right' && icon}
          </>
        )
      }
    </CustomButton>
  );

}

export default Button;
