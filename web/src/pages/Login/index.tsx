import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiLogIn, FiLock, FiMail } from 'react-icons/fi';
import * as yup from "yup";

import { Container, Form, FormContainer, ErrorMessage } from './styles';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import CenteredLayout from '../../layouts/CenteredLayout';
import Input from '../../components/Input';
import { useAuth } from '../../contexts/auth';
import { yupResolver } from '@hookform/resolvers';

interface FormData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required().label('E-mail'),
  password: yup.string().required().label('Password'),
});

const Login: React.FC = () => {
  const { signIn } = useAuth();

  const { register, handleSubmit, errors, setError } = useForm<FormData>({ resolver: yupResolver(schema) });

  const [invalidCredentials, setInvalidCredentials] = useState<boolean>(false);

  async function submit({ email, password }: FormData) {
    try {
      await signIn(email, password);
    } catch ({ response }) {
      if (!response) return;

      if (response.status === 400) {
        setInvalidCredentials(true);
        return;
      }
      const { errors } = response.data;

      errors.forEach(({ field, message }: { field: any, message: string }) => {
        setError(field, { type: 'manual', message });
      });
    }
  }

  return (
    <CenteredLayout>
      <Container>
        <FormContainer>
          <Logo />
          <h2>Sign In</h2>

          {invalidCredentials &&
            <ErrorMessage>E-mail and password do not match.</ErrorMessage>
          }

          <Form onSubmit={handleSubmit(submit)}>
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <Input
                name="email"
                type="text"
                icon={(<FiMail />)}
                ref={register}
                error={errors.email?.message}
              />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <Input
                name="password"
                type="password"
                icon={(<FiLock />)}
                ref={register}
                error={errors.password?.message}
              />
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