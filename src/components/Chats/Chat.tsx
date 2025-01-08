import styled from 'styled-components';
import { RiAiGenerate } from 'react-icons/ri';
import { ChatRole } from '../../types';

interface Props {
  children: React.ReactNode;
  role: ChatRole;
}

function Chat({ children, role }: Props) {
  return (
    <ChatStyle role={role}>
      {role === 'bot' && <RiAiGenerate className="botIcon" />}
      <div className="message">{children}</div>
    </ChatStyle>
  );
}

const ChatStyle = styled.div<{ role: ChatRole }>`
  display: flex;
  align-items: flex-start;
  justify-content: ${(props) => (props.role === 'bot' ? 'flex-start' : 'flex-end')};
  margin-bottom: 16px;

  .botIcon {
    font-size: 24px;
    margin-right: ${(props) => (props.role === 'bot' ? '10px' : '0')};
    color: #6c757d;
  }

  .message {
    max-width: 60%;
    padding: 12px 18px;
    border-radius: 10px;
    background: ${(props) => (props.role === 'bot' ? '#e9ecef' : '#f8f9fa')};
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    font-size: 14px;
    line-height: 1.5;
    word-break: break-word;

    ${(props) => (props.role === 'bot' ? 'border-top-left-radius: 4px;' : 'border-top-right-radius: 4px;')}
  }
`;

export default Chat;
