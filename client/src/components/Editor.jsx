// #10 Editor 컴포넌트
// 담당자 : 최민우 (Front-end)
// 2021-12-17 16:29:13

import { useState } from 'react';
import styled from 'styled-components';
import MDEditor from '@uiw/react-md-editor';

const ButtonWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
`;

const OkayButton = styled.button`
  margin-right : 0.5rem;
  font-size: 1rem;
  font-weight: bold;

  padding: 0.5rem 1rem;
  color: white;
  background-color: #fd97a8;
  border-radius: 6px;
  border: none;
  &:hover {
    background-color: #f9b6c2;
  }
  &:active {
    background-color: #ff6d88;

`;
const CancelButton = styled.button`

  font-size: 1rem;
  font-weight: bold;

  padding: 0.5rem 1rem;
  color: white;
  background-color: #fd97a8;
  border-radius: 6px;
  border: none;
  &:hover {
    background-color: #f9b6c2;
  }
  &:active {
    background-color: #ff6d88;
`;

const Editor = ({text, handleEditFinish, handleCancel}) => {

  const [value, setValue] = useState(text);

  return (
    <>
      <MDEditor
        value={value}
        onChange={setValue}
      />
      <ButtonWrapper>
        <OkayButton onClick={()=>{ handleEditFinish(value) }}>수정</OkayButton>
        <CancelButton onClick={handleCancel}>취소</CancelButton>
      </ButtonWrapper>
      {/* <MDEditor.Markdown source={value} /> */}
    </>
  );
};

export default Editor;
