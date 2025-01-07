import React from 'react';
import styled from 'styled-components';
import Chat from './Chat';
import QuestionInput from './QuestionInput';

interface ChatsProps {
  chats: { who: 'bot' | 'user'; message: string }[];
  handleSendMessage: (message: string) => void;
}

const Chats: React.FC<ChatsProps> = ({ chats, handleSendMessage }) => {
  return (
    <ChatsStyle>
      <div className="chatContent">
        <div className="chatBox">
          {chats.map((chat, index) => (
            <Chat key={index} who={chat.who}>
              {chat.message}
            </Chat>
          ))}
        </div>
      </div>
      <QuestionInput onSendMessage={handleSendMessage} />
    </ChatsStyle>
  );
};

const ChatsStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  margin: auto;

  .chatContent {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: auto;
    overflow-y: auto;
  }

  .chatContent::-webkit-scrollbar {
    width: 8px;
  }

  .chatContent::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
  }

  .chatBox {
    width: 80%;
    max-width: 1000px;
    margin: auto;
    padding: 30px 0;
  }
`;

export default Chats;
