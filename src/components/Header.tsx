import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthStore } from '../store/authStore';

function Header() {
  const { isLogin, logout } = useAuthStore();

  return (
    <HeaderStyle>
      <Link to="/" className="logo">
        RAG Chatbot
      </Link>

      <nav className="auth">
        {isLogin ? (
          <div className="authLink" onClick={logout}>
            로그아웃
          </div>
        ) : (
          <div className="authLogin">
            <Link to="login" className="authLink">
              로그인
            </Link>
            <Link to="signup" className="authLink">
              회원가입
            </Link>
          </div>
        )}
        <Link to="manager" className="authLink">
          관리자 메뉴
        </Link>
      </nav>
    </HeaderStyle>
  );
}

const HeaderStyle = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  height: 60px;
  padding: 20px 40px;
  background: #333;

  .logo {
    color: white;
    font-size: 24px;
    font-weight: 800;
    text-decoration: none;
  }

  .auth {
    display: flex;
    gap: 15px;

    .authLogin {
      display: flex;
      gap: 10px;
    }

    .authLink {
      color: white;
      font-size: 14px;
      font-weight: bold;
      text-decoration: none;
      cursor: pointer;
    }
  }
`;

export default Header;
