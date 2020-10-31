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
import { useTranslation } from 'react-i18next';
import { tYup } from '../../utils/tYup';

interface FormData {
  email: string;
}


const ForgotPassword: React.FC = () => {
  const { t } = useTranslation();

  const [emailSent, setEmailSent] = useState<boolean>(false);

  const schema = yup.object().shape({
    email: yup.string().email().required().label('E-mail'),
  });
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
                <p>{t('passwordResetDescription')}</p>
                <form onSubmit={handleSubmit(submit)}>
                  <div className="field">
                    {/* <label htmlFor="email">E-mail</label> */}
                    <Input
                      name="email"
                      type="text"
                      icon={(<FiMail />)}
                      ref={register}
                      error={tYup(errors.email?.message)}
                    />
                  </div>
                  <Button type='submit' icon={(<FiMail />)} iconPosition='left'>{t('sendPasswordReset')}</Button>
                </form>
              </AppCard>
              <p><Link to='/login'>{t('cancelPasswordReset')}</Link></p>
            </>
          ) : (
              <>
                <AppCard>
                  <Logo />
                  <p>{t('checkYourEmail')}</p>
                  <Link to='/login'><Button>{t('backToLogin')}</Button></Link>
                </AppCard>
              </>
            )
        }
      </Container>
    </CenteredLayout>
  );
}

export default ForgotPassword;