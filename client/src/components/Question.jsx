// 담당자 : 최민우 (Front-end)
// 2021-12-17 17:11:20

import { useState } from 'react';
import styled from 'styled-components';
import Editor from './Editor.jsx';
import MDEditor from '@uiw/react-md-editor';
import axios from 'axios';

import Userinfo from './UserInfo.jsx';
import DropdownEditCancel from './DropdownEditCancel.jsx';
import DeleteConfirm from './DeleteConfirm.jsx';
import SimpleOKModal from './SimpleOKModal.jsx';

const QuestionContainer = styled.div`
  padding: 2rem 1.5rem;
`;

const QuestionNameWrapper = styled.div`
  display: flex;
`;

const QuestionName = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.8);
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

const NameEditbox = styled.input`
  font-size: 1.4rem;
  font-weight: bold;
  color: rgba(32, 20, 20, 0.884);
  padding: 0.2rem 0.5rem;
  border: 1px solid #dfdfe0;
  flex: 80 80 auto;
  type: text;
`;

const EditorWrapper = styled.div`
  padding: 1rem;
`;

const AnwerAndLikesContainer = styled.div`
  margin-top: 1rem;
  display: flex;
`;

const AnswerCount = styled.div`
  text-align: center;
  font-weight: bold;
  flex: 1 1 auto;
`;

const AnswerAndLikesMiddleWrapper = styled.div`
  flex: 80 80 auto;
`;

const LikesWrapper = styled.div`
  font-weight: bold;
  flex: 1 1 auto;
`;

const UserInfoWrapper = styled.div`
  padding: 1rem;
`;

const Question = ({ result, handleQuestionEdit }) => {
  const [editMode, setEditMode] = useState(false);
  const [dropDownClick, setDropDownClick] = useState(false);
  const [questionName, setQuestionName] = useState(result.title);
  const [questionContent, setQuestionContent] = useState(result.content);
  const [confirmDropdown, setConfirmDropdown] = useState(false);
  const [noAuthDialog, setNoAuthDialog] = useState(false);

  const intoEditMode = async (e) => {
    setDropDownClick(false);
    if (editMode) return;
    let checkAuth;
    try {
      checkAuth = await axios.get('https://pinkdevsaurus.tk/auth', {
        withCredentials: true,
      });
    } catch (err) {
      return setNoAuthDialog(true);
    }

    if (checkAuth.data.result.user_id !== result.user_id) {
      return setNoAuthDialog(true);
    }

    setEditMode(true);
  };

  const cancelEditMode = (e) => {
    setQuestionName(result.title);
    setQuestionContent(result.content);
    setEditMode(false);
  };

  const handleEditFinish = (newContent) => {
    setEditMode(false);
    handleQuestionEdit(questionName, newContent);
    setQuestionContent(newContent);
  };

  const handleDropDownClick = (e) => {
    setDropDownClick(!dropDownClick);
  };

  const handleDelete = (result) => {
    setConfirmDropdown(true);
    setDropDownClick(false);
  };

  const handleDeleteConfirm = (result) => {
    setConfirmDropdown(false);
    if (!result) return;
    //fetch and delete content
    console.log('called');
  };

  return (
    <QuestionContainer>
      {confirmDropdown ? (
        <DeleteConfirm handleDelete={handleDeleteConfirm}></DeleteConfirm>
      ) : (
        false
      )}
      {noAuthDialog ? (
        <SimpleOKModal
          handleOK={() => setNoAuthDialog(false)}
          Message="요청하신 게시물을 수정할 권한이 없습니다."
        />
      ) : (
        false
      )}
      <QuestionNameWrapper>
        {editMode ? (
          <NameEditbox
            value={questionName}
            onChange={(e) => {
              setQuestionName(e.target.value);
            }}
          />
        ) : (
          <QuestionName>{questionName}</QuestionName>
        )}
        <IsModifiedWrapper>
          <IsModified cDate={result.created_date} mDate={result.modify_date}>
            수정됨
          </IsModified>
        </IsModifiedWrapper>
        <DropdownButtonWrapper>
          <DropdownButton onClick={handleDropDownClick}>...</DropdownButton>
          {dropDownClick ? (
            <DropdownEditCancel
              handleModify={intoEditMode}
              handleDelete={handleDelete}
            />
          ) : (
            false
          )}
        </DropdownButtonWrapper>
      </QuestionNameWrapper>
      <UserInfoWrapper>
        <Userinfo user={result} />
      </UserInfoWrapper>
      {editMode ? (
        <Editor
          text={questionContent}
          handleEditFinish={handleEditFinish}
          handleCancel={cancelEditMode}
        />
      ) : (
        <EditorWrapper>
          <MDEditor.Markdown source={questionContent} />
        </EditorWrapper>
      )}
      <AnwerAndLikesContainer>
        <AnswerCount>{result.answers.length} answers</AnswerCount>
        <AnswerAndLikesMiddleWrapper />
        <LikesWrapper>❤️ {result.likes} likes</LikesWrapper>
      </AnwerAndLikesContainer>
    </QuestionContainer>
  );
};

export default Question;
