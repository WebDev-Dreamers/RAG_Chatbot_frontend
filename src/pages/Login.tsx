import styled from 'styled-components';
import LoginForm from '../components/Login/LoginForm';
import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import Error from '../components/Errror';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { isLogin, error } = useAuth();
  const [visibleError, setVisibleError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLogin) {
      navigate('/');
    }
  }, [isLogin, navigate]);

  useEffect(() => {
    if (error) {
      setVisibleError(null);
      setTimeout(() => setVisibleError(error), 0);
      const timer = setTimeout(() => {
        setVisibleError(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <LoginStyle>
      {visibleError && <Error message={visibleError} />}
      <div className="container">
        <h1>LOGIN</h1>
        <LoginForm />
      </div>
    </LoginStyle>
  );
}

const LoginStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;

  .container {
    width: 100%;
    max-width: 400px;

    h1 {
      text-align: center;
      margin-bottom: 60px;
      font-size: 24px;
      font-weight: 1000;
      color: #333;
    }
  }
`;

export default Login;
