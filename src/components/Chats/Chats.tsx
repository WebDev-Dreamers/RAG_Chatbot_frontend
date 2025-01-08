import React from 'react';
import styled from 'styled-components';
import Chat from './Chat';
import QuestionInput from './QuestionInput';
import { IMessage } from '../../types';

interface ChatsProps {
  chats: IMessage[];
  sendMessage: (question: string) => void;
}

const Chats: React.FC<ChatsProps> = ({ chats, sendMessage }) => {
  return (
    <ChatsStyle>
      <div className="chatContent">
        <div className="chatBox">
          {chats.map((chat, index) => (
            <Chat key={index} role={chat.role}>
              {chat.content}
            </Chat>
          ))}
        </div>
      </div>
      <QuestionInput onSendMessage={sendMessage} />
    </ChatsStyle>
  );
};

const ChatsStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;

  .chatContent {
    flex: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 0 auto;
    overflow-y: auto;

    .chatBox {
      width: 80%;
      max-width: 1000px;
      margin: 0 auto;
      padding: 30px 0;
    }
  }

  .chatContent::-webkit-scrollbar {
    width: 8px;
  }

  .chatContent::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 4px;
  }
`;

export default Chats;
