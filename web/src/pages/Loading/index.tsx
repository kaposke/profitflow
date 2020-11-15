import React, { useContext } from 'react';
import { SpiralSpinner } from 'react-spinners-kit';
import CenteredLayout from '../../layouts/CenteredLayout';
import { ThemeContext } from 'styled-components'
import { useTranslation } from 'react-i18next';

// import { Container } from './styles';

const Loading: React.FC = () => {
  const { t } = useTranslation();
  const themeContext = useContext(ThemeContext);

  return (
    <CenteredLayout>
      <p>{t('loading')}</p>
      <SpiralSpinner backColor={themeContext.colors.green} frontColor={themeContext.colors.red} />
    </CenteredLayout>
  );
}

export default Loading;