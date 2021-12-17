// 담당자 : 김경봉 (Front-end)
// 2021-12-17 23:38:34

import React, { useState } from 'react';
import styled from 'styled-components';

const Side = styled.ul`
  background-color: var(--white);
  width: 100%;
  height: 100%;
  padding: 2.5rem;
`;

const Item = styled.li`
  position: relative;
  color: var(--pure-white);
  text-align: center;
  font-weight: bold;
  font-size: 1.5rem;
  border-radius: 20px;
  margin-bottom: 10%;
  padding: 1rem 2rem;
  width: 100%;
  background-color: var(--pink);

  ::before {
    content: '';
    position: absolute;
    width: 2.5rem;
    height: 2.5rem;
    top: 20%;
    left: 20%;
    border-radius: 100%;
    background-color: ${(props) => (props.selected ? '#A3250C' : 'white')};
  }
`;

const Sidebar = (props) => {
  const [selectedIdx, setSelectedIdx] = useState(0);

  return (
    <Side>
      {props.list.map((title, idx) => {
        return (
          <Item
            key={idx}
            selected={idx === selectedIdx}
            onClick={() => setSelectedIdx(idx)}
          >
            {title}
          </Item>
        );
      })}
    </Side>
  );
};

export default Sidebar;
