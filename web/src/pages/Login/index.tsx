import React from 'react';
import { Container } from './styles'
import LoginForm from '../../components/LoginForm';

const Login: React.FC = () => {
  return (
    <Container>
      <LoginForm />
    </Container>
  );
}

export default Login;