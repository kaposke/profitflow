import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { FiLogIn, FiLock, FiMail } from 'react-icons/fi';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers';
import { Trans, useTranslation } from 'react-i18next'

import { Container, Form, FormContainer, ErrorMessage } from './styles';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import CenteredLayout from '../../layouts/CenteredLayout';
import Input from '../../components/Input';
import { useAuth } from '../../contexts/auth';
import { tYup } from '../../utils/tYup';

interface FormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { t, i18n } = useTranslation();

  const { signIn } = useAuth();

  const schema = yup.object().shape({
    email: yup.string().email().required().label('E-mail'),
    password: yup.string().required().label(i18n.t('password')),
  });
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

      if (errors) {
        errors.forEach(({ field, message }: { field: any, message: string }) => {
          setError(field, { type: 'manual', message });
        });
      }
    }
  }


  return (
    <CenteredLayout>
      <Container>
        <FormContainer>
          <Logo />
          <h2>{t('signIn')}</h2>

          {invalidCredentials &&
            <ErrorMessage>{t('emailPasswordDoesNotMatch')}</ErrorMessage>
          }

          <Form onSubmit={handleSubmit(submit)}>
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <Input
                name="email"
                type="text"
                icon={(<FiMail />)}
                ref={register}
                error={tYup(errors.email?.message)}
              />
            </div>
            <div className="field">
              <label htmlFor="password">{t('password')}</label>
              <Input
                name="password"
                type="password"
                icon={(<FiLock />)}
                ref={register}
                error={tYup(errors.password?.message, { context: 'f'})}
              />
              <p style={{ textAlign: 'end', marginTop: '0.5rem' }}>
              <Link to='/forgot-password'>{t('forgotPassword')}</Link></p>
            </div>
            <Button type='submit' icon={(<FiLogIn />)}>{t('signIn')}</Button>
          </Form>

        </FormContainer>
        <Trans i18nKey='dontHaveAccount'><p>Don't have an acount? <Link to='/register'>Sign Up</Link></p></Trans>
      </Container>
    </CenteredLayout>
  );
}

export default Login;