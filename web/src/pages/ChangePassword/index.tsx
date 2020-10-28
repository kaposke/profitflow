import React, { useState } from 'react';
import Logo from '../../components/Logo';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { toast } from 'react-toastify';
import * as yup from "yup";

import { Container, AppCard } from './styles';
import Input from '../../components/Input';
import { FiCheckSquare, FiLock } from 'react-icons/fi';
import Button from '../../components/Button';
import CenteredLayout from '../../layouts/CenteredLayout';
import { Link, useHistory, useLocation } from 'react-router-dom';
import UserService from '../../services/user.service';
import { useTranslation } from 'react-i18next';
import { tYup } from '../../utils/tYup';

interface FormData {
  password: string;
  password_confirmation: string;
}

const ChangePassword: React.FC = () => {
  const { t } = useTranslation();

  const history = useHistory();

  const [passwordChanged, setPasswordChanged] = useState<boolean>(false);


  const schema = yup.object().shape({
    password: yup.string().min(8).required().label(t('password')),
    password_confirmation: yup.string().oneOf([yup.ref('password')], t('yup.passwordMatch')).required().label(t('passwordConfirmation')),
  });
  const { register, handleSubmit, errors } = useForm<FormData>({ resolver: yupResolver(schema) });

  const token = new URLSearchParams(useLocation().search).get('token');

  async function submit({ password, password_confirmation }: FormData) {
    if (!token) {
      toast.error(t('invalidToken'));
      history.push('/forgot-password');
      return;
    }

    try {
      await UserService.changePassword(token, password, password_confirmation);
      setPasswordChanged(true)
    } catch ({ response }) {
      if (response.status === 403) {
        toast.error(t('expiredToken'));
        history.push('/forgot-password');
        return;
      }

      toast.error(t('invalidToken'));
      history.push('/forgot-password');
    }
  }

  return (
    <CenteredLayout>
      <Container>
        {
          !passwordChanged ? (
            <>
              <AppCard>
                <Logo />
                <p>{t('newPassword')}</p>
                <form onSubmit={handleSubmit(submit)}>
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
                  <Button type='submit'>{t('changePassword')}</Button>
                </form>
              </AppCard>
              <p><Link to='/'>{t('cancelPasswordReset')}</Link></p>
            </>
          ) : (
              <>
                <AppCard>
                  <Logo />
                  <p>{t('passwordChanged')}</p>
                  <Link to='/'><Button>{t('backToLogin')}</Button></Link>
                </AppCard>
              </>
            )
        }

      </Container>
    </CenteredLayout>
  );
}

export default ChangePassword;