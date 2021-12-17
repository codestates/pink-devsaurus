// #12 Write 컴포넌트
// 담당자 : 최민우 (Front-end)

import { useState } from 'react';
import styled from 'styled-components';
import MDEditor from '@uiw/react-md-editor';

const NewDiscussionContainer = styled.div`
  padding: 1.2rem;
`;

const NewDicussionName=styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: rgba(32, 20, 20, 0.884);
`;

const CategoryAndTitleWrapper = styled.div`
  margin-top: 1.2rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
`;

const CategorySelect = styled.select`
  flex: 1 1 auto;
  font-size: 1.1rem;
  font-weight: bold;
  padding: 0.3rem 0.5rem;
  margin-right: 0.5rem;
  color: rgba(32, 20, 20, 0.747);
  border-radius: 6px;
  border-color: #dfdfe0;
  background-color: whitesmoke;
`;

const Title = styled.input`
  flex: 80 80 auto;
  font-size: 1.1rem;
  font-weight: bold;
  padding: 0.35rem 0.8rem;
  border-radius: 6px;
  color: rgba(32, 20, 20, 0.747);
  background-color: whitesmoke;
  border: 1px solid #dfdfe0;
`;

const StartDiscussionButton = styled.button`
  float: right;
  margin-top: 1rem;
  margin-right: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: #fd97a8;
  border-radius: 6px;
  border: none;
  &:hover {
    background-color: #f9b6c2;
  }
  &:active {
    background-color: #ff6d88;
  }
`;


const Write = (props) => {

  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');  
  const [content, setContent] = useState('');

  const handleClick = (e) => {
    // check and fetch
    // console.log( category, title, content );
  };

  return (
    <NewDiscussionContainer>
      <NewDicussionName>질문 작성하기</NewDicussionName>
      <CategoryAndTitleWrapper>
        <CategorySelect value={category} id="category" onChange={ (e) => { setCategory(e.target.value) }}>
            <option value="">카테고리 선택</option>
            {/* use map method  */}
            <option value="Database">Database</option>
            <option value="Javascript">Javascript</option>
            <option value="Network">Network</option>
        </CategorySelect>
        <Title placeholder="제목" value={title} onChange={(e)=>{ setTitle(e.target.value) }} />
      </CategoryAndTitleWrapper>
      <MDEditor
        value={content}
        onChange={setContent}
      ></MDEditor>
      <StartDiscussionButton onClick={handleClick}>질문 작성</StartDiscussionButton>
    </NewDiscussionContainer>
  );
};


export default Write;
