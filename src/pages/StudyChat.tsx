import styled from 'styled-components';
import { useChat } from '../hooks/useChat';
import History from '../components/History';
import Chats from '../components/Chats/Chats';
import { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import Error from '../components/Errror';
import { FiList } from 'react-icons/fi';

function StudyChat() {
  const { history, chats, selectedChatId, fetchChats, sendMessage, loading, error } = useChat('study');
  const [visibleError, setVisibleError] = useState<string | null>(null);
  const [visibleHistory, setVisibleHistory] = useState(window.innerWidth > 1200);

  useEffect(() => {
    if (error) {
      setVisibleError(error);
      const timer = setTimeout(() => {
        setVisibleError(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    const handleResize = () => {
      setVisibleHistory(window.innerWidth > 1200);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleHistory = () => {
    setVisibleHistory((prev) => !prev);
  };

  const handleHistory = (id: number) => {
    fetchChats(id);
  };

  return (
    <StudyChatStyle visibleHistory={visibleHistory}>
      <div className="history">
        <History
          type="study"
          items={history}
          selected={selectedChatId}
          onSelect={handleHistory}
          onToggle={toggleHistory}
        />
      </div>
      {!visibleHistory && (
        <button className="historyBtn" onClick={toggleHistory}>
          <FiList size={20} />
        </button>
      )}
      <div className="main">
        <Chats chats={chats} sendMessage={sendMessage} />
        {loading && <Loading />}
      </div>
      {visibleError && <Error message={visibleError} />}
    </StudyChatStyle>
  );
}

const StudyChatStyle = styled.div<{ visibleHistory: boolean }>`
  display: flex;
  height: calc(100vh - 100px - 62px);

  .history {
    height: 100%;
    width: 250px;
    background: #f4f4f4;
    transition: transform 0.3s ease;
    transform: ${({ visibleHistory }) => (visibleHistory ? 'translateX(0)' : 'translateX(-100%)')};
    display: ${({ visibleHistory }) => (visibleHistory ? '' : 'none')};
  }

  .historyBtn {
    position: absolute;
    top: 120px;
    left: -2px;
    height: 40px;
    width: 40px;
    background: #f4f4f4;
    color: black;
    border: none;
    padding: 10px 12px;
    font-size: 12px;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    cursor: pointer;
    z-index: 1;

    &:hover {
      color: rgb(73, 106, 141);
    }
  }

  .main {
    flex: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100%;
  }
`;

export default StudyChat;
