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

interface FormData {
  password: string;
  password_confirmation: string;
}

const schema = yup.object().shape({
  password: yup.string().min(8).required().label('Password'),
  password_confirmation: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required().label('Password Confirmation'),
});

const ChangePassword: React.FC = () => {
  const history = useHistory();

  const [passwordChanged, setPasswordChanged] = useState<boolean>(false);

  const { register, handleSubmit, errors } = useForm<FormData>({ resolver: yupResolver(schema) });

  const token = new URLSearchParams(useLocation().search).get('token');

  async function submit({ password, password_confirmation }: FormData) {
    if (!token) {
      toast.error('Invalid token. Please, request a new one.');
      history.push('/forgot-password');
      return;
    }

    try {
      await UserService.changePassword(token, password, password_confirmation);
      setPasswordChanged(true)
    } catch ({ response }){
      if (response.status === 403) {
        toast.error('Token expired. Please, request a new one.');
        history.push('/forgot-password');
        return;
      }

      toast.error('Invalid token. Please, request a new one.');
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
                <p>Provide your new password.</p>
                <form onSubmit={handleSubmit(submit)}>
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
                  <div className="field">
                    <label htmlFor="password_confirmation">Password Confirmation</label>
                    <Input
                      name="password_confirmation"
                      type="password"
                      icon={(<FiCheckSquare />)}
                      ref={register}
                      error={errors.password_confirmation?.message}
                    />
                  </div>
                  <Button type='submit'>Change password</Button>
                </form>
              </AppCard>
              <p><Link to='/'>Wait, I think I've remembered!</Link></p>
            </>
          ) : (
            <>
              <AppCard>
                <Logo />
                <p>Password changed successfully!</p>
                <Link to='/'><Button>Back to login</Button></Link>
              </AppCard>
            </>
          )
        }

      </Container>
    </CenteredLayout>
  );
}

export default ChangePassword;