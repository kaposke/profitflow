import React from 'react';
import CenteredLayout from '../../layouts/CenteredLayout';
import LoginForm from '../../components/LoginForm';

const Login: React.FC = () => {
  return (
    <CenteredLayout>
        <LoginForm />
    </CenteredLayout>
  );
}

export default Login;