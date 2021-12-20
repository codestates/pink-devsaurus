// 담당자 : 최민우 (Front-end)
// 2021-12-17 16:28:04

import { useState } from 'react';
import styled from 'styled-components';
import Editor from './Editor.jsx';
import MDEditor from '@uiw/react-md-editor';
import Userinfo from './UserInfo.jsx';
import DropdownEditCancel from './DropdownEditCancel.jsx';

// const fetchResult = {
//   answer_username: 'rihanna',
//   userprofile_img: 'https://avatars0.githubusercontent.com/u/1234?s=460&v=4',
//   answer_id: 1,
//   answer_content: 'blah blah blah',
//   created_date: '2020-04-01T00:00:00.000Z',
//   modified_date: '2020-04-01T00:00:00.000Z',
//   answer_likes: 12,
//   selected: true,
// };

const AnswerContainer = styled.div`
  padding: 1rem;
`;

const AnswerInfoWrapper = styled.div`
  display: flex;
`;

const UserInfoWrapper = styled.div`
  flex: 80 80 auto;
`;

const IsModifiedWrapper = styled.div`
  flex: 1 1 auto;
  text-align: right;
`;

const DropdownButtonWrapper = styled.div`
  flex: 1 1 auto;
`;

const IsModified = styled.span`
  color: rgb(32, 20, 20);
  background-color: lightgray;
  border-radius: 0.5rem;
  padding: 0.1rem 0.5rem;
  margin-right: 0.5rem;
  visibility: ${(props) =>
    props.cDate !== props.mDate ? 'visible' : 'hidden'};
`;

const DropdownButton = styled.span`
  color: rgb(32, 20, 20);
  background-color: lightgray;
  border-radius: 0.5rem;
  padding: 0.1rem 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: lightgreen;
    color: black;
  }
  &:focus {
    background-color: lightgreen;
    color: black;
  }
  /* &:active {
    background-color: var(--pink);
    color: black;
  } */
`;

const EditorWrapper = styled.div`
  padding: 1rem;
`;

const LikesWrapper = styled.div`
  font-weight: bold;
  text-align: right;
  margin-right: 1rem;
`;

const Answer = ({ result, handleAnswerEdit }) => {

  const [answerContent, setAnswerContent] = useState(result.answer_content);
  const [dropDownClick, setDropDownClick] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const intoEditMode = (e) => {
    setDropDownClick(false);
    if( editMode ) return ;    
    setEditMode(true);
  };

  const cancelEditMode = (e) => {
    setAnswerContent(result.answer_content);
    setEditMode(false);
  };

  const handleEditFinish = (newContent) => {
    setEditMode(false);
    handleAnswerEdit(newContent);
    setAnswerContent(newContent);
  };

  const handleDropDownClick = (e) => {
    setDropDownClick(!dropDownClick);
  };

  const handleDelete = (e) => {
    //need modal confirm
    //fetch and delete content
    setDropDownClick(false);
  };

  return (
    <AnswerContainer>
      <AnswerInfoWrapper>
        <UserInfoWrapper>
          <Userinfo user={result} />
        </UserInfoWrapper>햣 git 
        <IsModifiedWrapper>
          <IsModified cDate={result.created_date} mDate={result.modify_date}>
            수정됨
          </IsModified>
        </IsModifiedWrapper>
        <DropdownButtonWrapper>
          <DropdownButton onClick={handleDropDownClick}>...</DropdownButton>
          { dropDownClick
            ? <DropdownEditCancel handleModify={intoEditMode} handleDelete={handleDelete}/>
            : false 
          }
        </DropdownButtonWrapper>
      </AnswerInfoWrapper>
      <EditorWrapper>
        {editMode ? (
          <Editor
            text={answerContent}
            handleEditFinish={handleEditFinish}
            handleCancel={cancelEditMode}
          />
        ) : (
          <MDEditor.Markdown source={answerContent} />
        )}
      </EditorWrapper>
      <LikesWrapper>❤️ {result.answer_likes} likes</LikesWrapper>
    </AnswerContainer>
  );
};

export default Answer;
