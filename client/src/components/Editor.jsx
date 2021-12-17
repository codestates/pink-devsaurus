// #10 Editor 컴포넌트
// 담당자 : 최민우 (Front-end)

import { useState } from 'react';
import styled from 'styled-components';
import MDEditor from '@uiw/react-md-editor';

const ButtonWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
`;

const OkayButton = styled.button`
  padding: 0.3rem 1rem;
  margin-right : 0.5rem;
  font-size: 1rem;
  font-weight: bold;
`;
const CancelButton = styled.button`
  padding: 0.3rem 1rem;
  font-size: 1rem;
  font-weight: bold;
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
