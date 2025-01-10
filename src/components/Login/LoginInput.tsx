import styled from 'styled-components';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

interface LoginInputProps {
  type: 'email' | 'password';
  placeholder: string;
  value: string;
  error: string;
  onChange: (value: string) => void;
  passwordVisibility?: () => void;
  showPassword?: boolean;
}

const LoginInput: React.FC<LoginInputProps> = ({
  type,
  placeholder,
  value,
  error,
  onChange,
  passwordVisibility,
  showPassword,
}) => {
  return (
    <LoginInputStyle>
      <input
        type={type === 'password' && passwordVisibility ? (showPassword ? 'text' : 'password') : type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {passwordVisibility && (
        <button type="button" className="toggle-btn" onClick={passwordVisibility}>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}
      <span className={`error ${error ? 'visible' : ''}`}>{error}</span>
    </LoginInputStyle>
  );
};

const LoginInputStyle = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  input {
    height: 40px;
    padding: 0 10px;
    border: 1px solid #ccc;
    font-size: 14px;
    outline: none;
    transition: border-color 0.3s ease;

    &:focus {
      border-color: #2c3e50;
    }

    &[type='password'] {
      padding-right: 40px;
    }
  }

  .toggle-btn {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-175%);
    background: none;
    border: none;
    font-size: 16px;
    color: #555;
    cursor: pointer;

    &:hover {
      color: #2c3e50;
    }
  }

  .error {
    margin-top: 8px;
    margin-left: 4px;
    font-size: 12px;
    font-weight: 500;
    color: rgb(119, 23, 23);
    visibility: hidden;
    min-height: 16px;
  }

  .error.visible {
    visibility: visible;
  }
`;

export default LoginInput;
