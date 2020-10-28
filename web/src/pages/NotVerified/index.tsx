import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { FiLogOut } from 'react-icons/fi';
import AppCard from '../../components/AppCard';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import { useAuth } from '../../contexts/auth';

import { Container } from './styles';

const NotVerified: React.FC = () => {
  const { t } = useTranslation();

  const { user, signOut } = useAuth();

  if (!user) {
    signOut();
    return (<div>{t('signingOut')}</div>);
  }

  return (
    <Container>
      <AppCard className='card'>
        {/* <div className='logout-button' onClick={signOut}>
          <FiLogOut />Log-out
        </div> */}
        <Logo />
        <p>
          {t('welcomeUser', { username: user.name })}
        </p>
        <p>
          <Trans i18nKey='accountNotVerified' tOptions={{ email: user.email }}>
              <span>{user.email}</span>
          </Trans>
        </p>

        <div className="buttons">
          {/* <Button onClick={AccountVerificationService.requestVerificationEmail} icon={(<FiMail />)} iconPosition='left'>Send me another e-mail</Button> */}
        <Button onClick={signOut} icon={(<FiLogOut />)} iconPosition='left'>{t('logOut')}</Button>
        </div>
      </AppCard>
    </Container>
  );
}

export default NotVerified;