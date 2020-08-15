import React from 'react';
import { toast } from 'react-toastify';

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

const Register: React.FC = () => {
  const history = useHistory();

  const { register, handleSubmit } = useForm<FormData>();

  function submit(formData: FormData) {
    userService.create(formData).then(response => {
      toast.success('Account created successfully!');
      history.push('/');
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
              <Input name="username" ref={register} type="text" icon={(<FiUser />)} />
            </div>
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <Input name="email" ref={register} type="text" icon={(<FiMail />)} />
            </div>
            <div className="field">
              <label htmlFor="password">Password</label>
              <Input name="password" ref={register} type="password" icon={(<FiLock />)} />
            </div>
            <div className="field">
              <label htmlFor="password_confirmation">Password Confirmation</label>
              <Input name="password_confirmation" ref={register} type="password" icon={(<FiCheckSquare />)} />
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