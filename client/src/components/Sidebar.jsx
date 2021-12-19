import React, { useState } from 'react';
import styled from 'styled-components';

const Side = styled.ul`
  flex: 2.5 0 0;
  background-color: var(--white);
  min-width: 350px;
  width: 100%;
  padding: 2% 2%;
`;

const Item = styled.li`
  display: flex;
  color: var(--pure-white);
  font-weight: 500;
  font-size: 1.8rem;
  border-radius: 20px;
  margin-bottom: 10%;
  padding: 1rem 0;
  background-color: var(--pink);

  :hover {
    background-color: var(--hover-pink);
  }
`;

const Circle = styled.div`
  position: relative;
  margin-left: 10%;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 100%;
  background-color: ${(props) => (props.selected ? '#A3250C' : 'white')};
  background-image: ${(props) => props.src};
`;

const Icon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Text = styled.div`
  margin-left: 10%;
  line-height: 40px;
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
            src={item.category_image}
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
