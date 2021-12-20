import React, { useState } from 'react';
import styled from 'styled-components';

const Side = styled.ul`
  position: fixed;
  top: 6vmax;
  left: 0;
  width: 25%;
  height: 100%;
  background-color: var(--white);
  overflow-x: hidden;
  white-space: nowrap;
  padding: 2% 2%;
`;

const Item = styled.li`
  display: flex;
  color: var(--pure-white);
  font-weight: 500;
  font-size: 1.8vmax;
  border-radius: 20px;
  margin-bottom: 10%;
  padding: 1vmax 0;
  background-color: var(--pink);

  :hover {
    background-color: var(--hover-pink);
  }
`;

const CircleWrapper = styled.div`
  position: relative;
  margin-left: 15%;

  > div {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 2.5vmax;
    height: 2.5vmax;
    border-radius: 100%;
    background-color: ${(props) => (props.selected ? '#A3250C' : 'white')};
    background-image: ${(props) => props.src};
    line-height: 40px;
  }
`;

const Text = styled.div`
  margin-left: 15%;
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
            <CircleWrapper selected={idx === selectedIdx}>
              <div></div>
            </CircleWrapper>
            <Text>{item.category_name}</Text>
          </Item>
        );
      })}
    </Side>
  );
};

export default Sidebar;
