import React from 'react';
import { toast } from 'react-toastify';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers';

import { Container, Form, FormContainer } from './styles';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import { Link, useHistory } from 'react-router-dom';
import CenteredLayout from '../../layouts/CenteredLayout';
import { FiUser, FiMail, FiLock, FiCheckSquare } from 'react-icons/fi';
import Input from '../../components/Input';
import { useForm } from 'react-hook-form';
import userService from '../../services/user.service';


interface FormData {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const schema = yup.object().shape({
  username: yup.string().required().label('Username'),
  email: yup.string().email().required().label('E-mail'),
  password: yup.string().min(8).required().label('Password'),
  password_confirmation: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required().label('Password Confirmation'),
});

const Register: React.FC = () => {
  const history = useHistory();

  const { register, handleSubmit, errors, setError } = useForm<FormData>({ resolver: yupResolver(schema) });

  function submit(formData: FormData) {

    userService.create(formData).then(response => {
      toast.success('Account created successfully!');
      history.push('/');
    }).catch(({response}) => {
      const { errors } = response.data;
      errors.forEach(({field, message}: {field: any, message: string}) => {
        setError(field, { type: 'manual', message });
      });
    });
  }

  return (
    <CenteredLayout>
      <Container>
        <FormContainer>
          <Logo />
          <h2>Create your account</h2>
          <Form onSubmit={handleSubmit(submit)}>
            <div className="field">
              <label htmlFor="username">Username</label>
              <Input
                name="username"
                type="text"
                icon={(<FiUser />)}
                ref={register}
                error={errors.username?.message}
              />
            </div>
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <Input
                name="email"
                type="email"
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
            <Button>Sign Up</Button>
          </Form>
        </FormContainer>
        <p>Already registered? <Link to='/'>Sign In</Link></p>
      </Container>
    </CenteredLayout>
  );
}

export default Register;