import React from 'react';
import { useForm } from 'react-hook-form';

import { Container, Form, FormContainer } from './styles';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import { Link } from 'react-router-dom';
import CenteredLayout from '../../layouts/CenteredLayout';
import Input from '../../components/Input';
import { useAuth } from '../../contexts/auth';
import { FiLogIn, FiLock, FiMail } from 'react-icons/fi';

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { signIn } = useAuth();

  const { register, handleSubmit } = useForm<FormData>();

  function submit({ email, password }: FormData) {
    signIn(email, password);
  }

  return (
    <CenteredLayout>
      <Container>
        <FormContainer>
          <Logo />
          <h2>Sign In</h2>

          <Form onSubmit={handleSubmit(submit)}>
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <Input name="email" ref={register} type="text" icon={(<FiMail />)} />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <Input name="password" ref={register} type="password" icon={(<FiLock />)} />
            </div>
            <Button type='submit' icon={(<FiLogIn />)}>Sign In</Button>
          </Form>

        </FormContainer>
        <p>Don't have an acount? <Link to='/register'>Sign Up</Link></p>
      </Container>
    </CenteredLayout>
  );
}

export default Login;