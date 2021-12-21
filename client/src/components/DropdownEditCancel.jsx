// 담당자 : 최민우 (Front-end)
// 2021-12-17 17:37:46
// copied sources from 김경봉

import React from 'react';
import styled from 'styled-components';

const DropdownContents = styled.ul`
  margin-top: 0.5rem;
  position: absolute;
  font-size: 1rem;
  right: 1rem;
  padding: 0.4rem 0.5rem;
  border-radius: 5px;
  background-color: lightpink;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
`;

const Triangle = styled.span`
  position: absolute;
  top: -0.5rem;
  right: 1rem;
  border-left: 0.5rem solid transparent;
  border-right: 0.5rem solid transparent;
  border-bottom: 0.5rem solid lightpink;
  z-index: 0;
`;

const DropdownContent = styled.li`
  color: white;
  font-weight: bold;
  padding: 10px;
  text-align: center;
  z-index: 2;

  :hover {
    border-radius: 5px;
    background-color: #fd97a8;
    cursor: pointer;
  }
`;

const DropdownEditCancel = ({ handleModify, handleDelete }) => {
  return (
    <DropdownContents>
      <Triangle />
      <DropdownContent onClick={handleModify}>수정</DropdownContent>
      <DropdownContent onClick={handleDelete}>삭제</DropdownContent>
    </DropdownContents>
  );
};

export default DropdownEditCancel;
