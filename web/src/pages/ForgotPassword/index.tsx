import React, { useState } from 'react';
import Logo from '../../components/Logo';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from "yup";

import { Container, AppCard } from './styles';
import Input from '../../components/Input';
import { FiMail } from 'react-icons/fi';
import Button from '../../components/Button';
import CenteredLayout from '../../layouts/CenteredLayout';
import { Link } from 'react-router-dom';
import UserService from '../../services/user.service';

interface FormData {
  email: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required().label('E-mail'),
});

const ForgotPassword: React.FC = () => {
  const [emailSent, setEmailSent] = useState<boolean>(false);

  const { register, handleSubmit, errors } = useForm<FormData>({ resolver: yupResolver(schema) });


  async function submit({ email }: FormData) {
    await UserService.requestPasswordChange(email);
    setEmailSent(true);
  }

  return (
    <CenteredLayout>
      <Container>
        {
          !emailSent ? (
            <>
              <AppCard>
                <Logo />
                <p>Enter your e-mail so that we can send you a password reset link.</p>
                <form onSubmit={handleSubmit(submit)}>
                  <div className="field">
                    {/* <label htmlFor="email">E-mail</label> */}
                    <Input
                      name="email"
                      type="text"
                      icon={(<FiMail />)}
                      ref={register}
                      error={errors.email?.message}
                    />
                  </div>
                  <Button type='submit' icon={(<FiMail />)} iconPosition='left'>Send password reset email</Button>
                </form>
              </AppCard>
              <p><Link to='/'>Wait, I think I've remembered!</Link></p>
            </>
          ) : (
            <>
              <AppCard>
                <Logo />
                <p>Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.</p>
                <Link to='/'><Button>Back to login</Button></Link>
              </AppCard>
            </>
          )
        }

      </Container>
    </CenteredLayout>
  );
}

export default ForgotPassword;