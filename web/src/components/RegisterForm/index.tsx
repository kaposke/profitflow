import React from 'react';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers';

import { Container, Form, FormContainer } from './styles';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import { Link } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiCheckSquare } from 'react-icons/fi';
import Input from '../../components/Input';
import { useForm } from 'react-hook-form';
import userService from '../../services/user.service';
import { useAuth } from '../../contexts/auth';
import { Trans, useTranslation } from 'react-i18next';
import { tYup } from '../../utils/tYup';


interface FormData {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const RegisterForm: React.FC = () => {
  const { t } = useTranslation();

  const { signIn } = useAuth();

  const schema = yup.object().shape({
    username: yup.string().required().label(t('username')),
    email: yup.string().email().required().label('E-mail'),
    password: yup.string().min(8).required().label(t('password')),
    password_confirmation: yup.string().oneOf([yup.ref('password')], t('yup.passwordMatch')).required().label(t('passwordConfirmation')),
  });

  const { register, handleSubmit, errors, setError } = useForm<FormData>({ resolver: yupResolver(schema) });

  function submit(formData: FormData) {
    userService.create(formData)
      .then(response => {
        signIn(formData.email, formData.password);
      })
      .catch(({ response }) => {
        if (!response) return;
        const { errors } = response.data;

        errors.forEach(({ field, message }: { field: any, message: string }) => {
          setError(field, { type: 'manual', message });
        });
      });
  }

  return (
    <Container>
      <FormContainer>
        <Logo />
        <h2>{t('registerTitle')}</h2>
        <Form onSubmit={handleSubmit(submit)}>
          <div className="field">
            <label htmlFor="username">{t('username')}</label>
            <Input
              name="username"
              type="text"
              icon={(<FiUser />)}
              ref={register}
              error={tYup(errors.username?.message)}
            />
          </div>
          <div className="field">
            <label htmlFor="email">E-mail</label>
            <Input
              name="email"
              type="email"
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
              error={tYup(errors.password?.message, { context: 'f' })}
            />
          </div>
          <div className="field">
            <label htmlFor="password_confirmation">{t('passwordConfirmation')}</label>
            <Input
              name="password_confirmation"
              type="password"
              icon={(<FiCheckSquare />)}
              ref={register}
              error={tYup(errors.password_confirmation?.message, { context: 'f' })}
            />
          </div>
          <Button>{t('signUp')}</Button>
        </Form>
      </FormContainer>
      <Trans i18nKey='haveAccount'><p>Already registered? <Link to='/login'>Sign In</Link></p></Trans>
    </Container>
  );
}

export default RegisterForm;