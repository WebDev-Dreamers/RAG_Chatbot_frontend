import styled from 'styled-components';
import { RiAiGenerate } from 'react-icons/ri';

interface Props {
  children: React.ReactNode;
  who: 'bot' | 'user';
}

function Chat({ children, who }: Props) {
  return (
    <ChatStyle who={who}>
      {who === 'bot' && <RiAiGenerate className="botIcon" />}
      <div className="message">{children}</div>
    </ChatStyle>
  );
}

const ChatStyle = styled.div<{ who: 'bot' | 'user' }>`
  display: flex;
  align-items: flex-start;
  justify-content: ${(props) => (props.who === 'bot' ? 'flex-start' : 'flex-end')};
  margin-bottom: 16px;

  .botIcon {
    font-size: 24px;
    margin-right: ${(props) => (props.who === 'bot' ? '10px' : '0')};
    color: #6c757d;
  }

  .message {
    max-width: 60%;
    padding: 12px 18px;
    border-radius: 10px;
    background: ${(props) => (props.who === 'bot' ? '#e9ecef' : '#f8f9fa')};
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    font-size: 14px;
    line-height: 1.5;
    word-break: break-word;

    ${(props) => (props.who === 'bot' ? 'border-top-left-radius: 4px;' : 'border-top-right-radius: 4px;')}
  }
`;

export default Chat;
