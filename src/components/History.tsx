import React from 'react';
import styled from 'styled-components';
import { ChatType, IHistory } from '../types';
import { FiChevronLeft } from 'react-icons/fi';

interface HistoryProps {
  type: ChatType;
  items: IHistory[];
  selected: number | null;
  onSelect?: (id: number) => void;
  onToggle: () => void;
}

const History: React.FC<HistoryProps> = ({ type, items, selected, onSelect, onToggle }) => {
  return (
    <HistoryStyle>
      <div className="header">
        <div className="title">{type === 'study' ? 'STUDY' : 'CUSTOM'} HISTORY</div>
        <button className="toggleBtn" onClick={onToggle}>
          <FiChevronLeft />
        </button>
      </div>
      <ul className="list">
        {items.map((item) => (
          <li
            key={item.id}
            className={`item ${item.id === selected ? 'selected' : ''}`}
            onClick={() => onSelect && onSelect(item.id)}
          >
            {item.title}
          </li>
        ))}
      </ul>
    </HistoryStyle>
  );
};

const HistoryStyle = styled.div`
  padding: 20px;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    .title {
      font-size: 16px;
      font-weight: bold;
    }

    .toggleBtn {
      margin-top: 10px;
      background: none;
      color: #black;
      border: none;
      font-size: 18px;
      cursor: pointer;

      &:hover {
        color: rgb(73, 106, 141);
      }
    }
  }

  .list {
    list-style: none;
    padding: 0;
    margin: 10px 0;

    .item {
      padding: 10px 10px;
      border-radius: 8px;
      color: #555;
      font-size: 14px;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        background: #e9ecef;
      }

      &.selected {
        background: #e9ecef;
        color: #2c3e50;
        font-weight: bold;
      }
    }
  }
`;

export default History;
