import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import { MdSignalCellularConnectedNoInternet0Bar } from 'react-icons/md';
import AppCard from '../../components/AppCard';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import { useAuth } from '../../contexts/auth';

import { Container } from './styles';

const NotVerified: React.FC = () => {
  const { user, signOut } = useAuth();

  if (!user) {
    signOut();
    return <div>Signing Out...</div>;
  }

  return (
    <Container>
      <AppCard className='card'>
        {/* <div className='logout-button' onClick={signOut}>
          <FiLogOut />Log-out
        </div> */}
        <Logo />
        <p>
          Welcome to ProfitFlow, {user.name}!
        </p>
        <p>
          Your account is not yet verified. Please, click the activation link we sent to <span>{user.email}</span>
        </p>

        <div className="buttons">
          {/* <Button>Send me another e-mail</Button> */}
          <Button onClick={signOut} icon={(<FiLogOut />)} iconPosition='left'>Log out</Button>
        </div>
      </AppCard>
    </Container>
  );
}

export default NotVerified;