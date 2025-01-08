import styled from 'styled-components';
import { FaArrowUp } from 'react-icons/fa';
import { useRef, useState } from 'react';

interface QuestionInputProps {
  onSendMessage: (question: string) => void;
}

function QuestionInput({ onSendMessage }: QuestionInputProps) {
  const [question, setQuestion] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleSend = () => {
    if (question.trim()) {
      onSendMessage(question);
      setQuestion('');

      if (textareaRef.current) {
        textareaRef.current.style.height = '40px';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <QuestionInputStyle>
      <textarea
        ref={textareaRef}
        placeholder="메시지 입력"
        className="input"
        onChange={handleChange}
        value={question}
        onKeyDown={handleKeyDown}
        rows={1}
      />
      <button className="sendBtn" onClick={handleSend}>
        <FaArrowUp />
      </button>
    </QuestionInputStyle>
  );
}

const QuestionInputStyle = styled.div`
  display: flex;
  width: 80%;
  max-width: 600px;
  margin: 0px auto 28px;
  padding: 10px;
  text-align: center;
  background: #f1f3f5;
  border-radius: 20px;

  .input {
    flex-grow: 1;
    resize: none;
    padding: 10px 16px;
    margin-right: 10px;
    min-height: 40px;
    max-height: 120px;
    font-size: 14px;
    background: none;
    border: none;
    outline: none;
    overflow-y: auto;

    &::placeholder {
      color: #aaa;
      font-size: 14px;
    }
  }

  .input::-webkit-scrollbar {
    width: 6px;
  }

  .input::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
  }

  .sendBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    background: #2c3e50;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    margin: auto 6px;
    transition: background-color 0.3s ease;

    svg {
      width: 14px;
      height: 14px;
      color: white;
    }

    &:hover {
      background: rgb(50, 76, 103);
    }

    &:active {
      background: #22313f;
    }
  }
`;

export default QuestionInput;
