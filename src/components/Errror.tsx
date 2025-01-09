import React from 'react';
import styled from 'styled-components';

interface ErrorProps {
  message: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  return <ErrorStyle>{message}</ErrorStyle>;
};

const ErrorStyle = styled.div`
  position: fixed;
  top: 120px;
  right: 0px;
  background: #2c3e50;
  color: white;
  padding: 14px 24px;
  font-size: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  animation: fadeInOut 2s ease-in-out forwards;

  @keyframes fadeInOut {
    0% {
      opacity: 0;
      transform: translateX(100px);
    }
    10% {
      opacity: 1;
      transform: translateX(0);
    }
    90% {
      opacity: 1;
      transform: translateX(0);
    }
    100% {
      opacity: 0;
      transform: translateX(100px);
    }
  }
`;

export default Error;
