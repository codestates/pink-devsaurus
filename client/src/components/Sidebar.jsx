import React, { useState } from 'react';
import styled from 'styled-components';

const Side = styled.ul`
  position: fixed;
  top: 8.5vmax;
  left: 5%;
  width: 22%;
  height: 100%;
  background-color: #fafafa;
  overflow-x: hidden;
  white-space: nowrap;
  padding: 2.3% 1%;
  z-index: 10;
  box-shadow: 7px 0px 7px 0px rgba(209, 209, 209, 0.9);
`;

const Item = styled.li`
  display: flex;
  /* color: var(--pure-white); */
  color: #f1aaa9;
  font-weight: 700;
  font-size: 1.4vmax;
  border-radius: 20px;
  margin-bottom: 5%;
  padding: 0.1vmax 0;
  /* background-color: ${(props) =>
    props.selected ? '#ec58a9' : '#080708'}; */
  /* background-color: var(--pink); */
  /* background-color: #f1aaa9; */

  :hover {
    /* background-color: var(--hover-pink); */
    /* color: #ec58a9; */
    color: #6d6f73;
    font-size: 1.5vmax;
    cursor: pointer;
  }
`;

const CircleWrapper = styled.div`
  position: relative;
  /* margin-left: 12%; */

  /* > div {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 1.8vmax;
    height: 1.8vmax;
    border-radius: 100%;
    line-height: 40px;
  } */
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
            selected={idx === selectedIdx}
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
