import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Side = styled.ul`
  position: fixed;
  top: 8.5vmax;
  left: 5.02%;
  width: 22%;
  height: 100%;
  background-color: #fafafa;
  border-radius: 0 0 0 40px;
  overflow-x: hidden;
  white-space: nowrap;
  padding: 2.3% 1%;
  z-index: 10;
  box-shadow: 7px 0px 7px 0px rgba(209, 209, 209, 0.9);
`;

const Item = styled.li`
  display: flex;
  color: ${(props) => (props.selected ? '#6d6f73' : '#f1aaa9')};
  font-weight: 700;
  font-size: 1.4vmax;
  border-radius: 20px;
  margin-bottom: 5%;
  padding: 0.1vmax 0;

  :hover {
    color: #6d6f73;
    font-size: 1.5vmax;
    cursor: pointer;
  }
`;

const Text = styled.div`
  margin-left: 10%;
  line-height: 40px;
  text-align: left;
`;

const Sidebar = ({ list = [], setSelectedCategory = () => {} }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);

  const filterCategory = (idx) => {
    setSelectedIdx(idx);
    setSelectedCategory(idx);
  };

  return (
    <Side>
      {list.map((item, idx) => {
        return list.length === 2 ? (
          <Link to={idx === 0 ? '/mypage' : '/myqna'}>
            <Item
              key={idx}
              onClick={() => filterCategory(idx)}
              selected={idx === selectedIdx}
            >
              <Text>{item.category_name}</Text>
            </Item>
          </Link>
        ) : (
          <Item
            key={idx}
            onClick={() => filterCategory(idx)}
            selected={idx === selectedIdx}
          >
            <Text>{item.category_name}</Text>
          </Item>
        );
      })}
    </Side>
  );
};

export default Sidebar;
