import React, { useState } from 'react';
import styled from 'styled-components';
import LoginInput from './LoginInput';
import { useAuth } from '../../hooks/useAuth';

function LoginForm() {
  const { handleLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (password: string) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password);

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setEmailError(validateEmail(value) ? '' : '이메일 형식을 맞춰주세요.');
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setPasswordError(validatePassword(value) ? '' : '영문, 숫자 포함 8자 이상 입력해주세요.');
  };

  const passwordVisibility = () => setShowPassword((prev) => !prev);

  const isFormValid = emailError === '' && passwordError === '' && email && password;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      handleLogin(email, password);
    }
  };

  return (
    <LoginFormStyle onSubmit={handleSubmit}>
      <LoginInput
        type="email"
        placeholder="이메일을 입력하세요"
        value={email}
        error={emailError}
        onChange={handleEmailChange}
      />
      <LoginInput
        type="password"
        placeholder="비밀번호를 입력하세요"
        value={password}
        error={passwordError}
        onChange={handlePasswordChange}
        passwordVisibility={passwordVisibility}
        showPassword={showPassword}
      />
      <button type="submit" disabled={!isFormValid} className={isFormValid ? 'active' : ''}>
        로그인
      </button>
    </LoginFormStyle>
  );
}

const LoginFormStyle = styled.form`
  display: flex;
  flex-direction: column;

  button {
    margin-top: 40px;
    height: 40px;
    background: rgb(148, 157, 166);
    color: white;
    border: none;
    font-size: 12px;
    cursor: not-allowed;
    transition: background-color 0.3s ease;

    &.active {
      background: #2c3e50;
      cursor: pointer;
    }

    &:hover.active {
      background: rgb(36, 49, 62);
    }
  }
`;

export default LoginForm;
