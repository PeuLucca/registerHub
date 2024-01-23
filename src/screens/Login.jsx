// Core
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Components
import Logo from '../components/Logo';

// Style
import {
  Container,
  LoginForm,
  FormInput,
  FormButton,
  ErrorMessage
} from '../style/Login.style';

// Firebase
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebase";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (email === '' || password === '') {
      setError('Credenciais inválidas. Tente novamente.');
    } else {
      validateUser();
    }
  };

  const validateUser = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User logged in:', user);
      navigate('/cadastro');
    } catch (error) {
      console.error(error);
      setError('Email ou senha incorretos. Por favor tente novamente!');
    }
  };

  return (
    <>
    <Container>
      <LoginForm>
        <h1>Login</h1>
        <FormInput
          placeholder='Insira seu email'
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <FormInput
          style={{ marginTop: "0" }}
          placeholder='Insira sua senha'
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <FormButton type="button" onClick={handleLogin} style={{ fontWeight: "bold" }}>
          Login
        </FormButton>

        {error && <ErrorMessage>{error}</ErrorMessage>}
      </LoginForm>
      <Logo />
    </Container>
    <div style={{ textAlign: 'center', marginTop: '1em' }}>
      <Link to="/novo-usuario" style={{ color: 'gray' }}>
        Não tem usuário? Cadastre-se
      </Link>
    </div>
      </>
  );
};

export default Login;
