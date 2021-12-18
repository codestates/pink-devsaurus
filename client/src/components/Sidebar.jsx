import React, { useState } from 'react';
import styled from 'styled-components';

const Side = styled.ul`
  flex: 2 0 0;
  background-color: var(--white);
  min-width: 350px;
  width: 100%;
  height: 100%;
  padding: 2.5rem;
`;

const Item = styled.li`
  display: flex;
  color: var(--pure-white);
  font-weight: bold;
  font-size: 1.5rem;
  border-radius: 20px;
  margin-bottom: 10%;
  padding: 1rem 0;
  width: 100%;
  background-color: var(--pink);

  :hover {
    background-color: var(--hover-pink);
  }
`;

const Circle = styled.div`
  position: relative;
  margin: 0 5%;
  min-width: 2rem;
  min-height: 2rem;
  border-radius: 100%;
  background-color: ${(props) => (props.selected ? '#A3250C' : 'white')};
`;

const Icon = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1.5rem;
  height: 1.5rem;
  object-fit: cover;
`;

const Text = styled.div`
  width: 100%;
  margin-left: 5%;
  text-align: left;
`;

const Sidebar = ({ list = [] }) => {
  const [selectedIdx, setSelectedIdx] = useState(0);

  return (
    <Side>
      {list.map((item, idx) => {
        return (
          <Item
            key={idx}
            onClick={() => setSelectedIdx(idx)}
          >
            <Circle selected={idx === selectedIdx}>
              <Icon src={item.category_image} alt="카테고리 이미지"></Icon>
            </Circle>
            <Text>{item.category_name}</Text>
          </Item>
        );
      })}
    </Side>
  );
};

export default Sidebar;
