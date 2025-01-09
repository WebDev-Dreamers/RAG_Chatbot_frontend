import React from 'react';
import styled from 'styled-components';

const Loading: React.FC = () => {
  return (
    <LoadingStyle>
      <div className="spinner"></div>
    </LoadingStyle>
  );
};

const LoadingStyle = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;

  .spinner {
    width: 30px;
    height: 30px;
    border: 4px solid #ddd;
    border-top: 4px solid #2c3e50;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loading;
