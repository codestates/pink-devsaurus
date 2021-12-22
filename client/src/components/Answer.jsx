// 담당자 : 최민우 (Front-end)
// 2021-12-17 16:28:04

import { useState, useLayoutEffect } from 'react';
import styled from 'styled-components';
import Editor from './Editor.jsx';
import MDEditor from '@uiw/react-md-editor';
import axios from 'axios';

import Userinfo from './UserInfo.jsx';
import DropdownEditCancel from './DropdownEditCancel.jsx';
import DeleteConfirm from './DeleteConfirm.jsx';
import SimpleOKModal from './SimpleOKModal.jsx';

const AnswerContainer = styled.div`
  margin-top: 1rem;
  padding: 1rem;
`;

const AnswerInfoWrapper = styled.div`
  display: flex;
  margin-bottom: 1rem;
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

const SelectAsAnswerAndLikesContainer = styled.div`
  margin-top: 1rem;
  display: flex;
`;

const SelectAsAnswerAndLikesMiddleWrapper = styled.div`
  flex: 80 80 auto;
`;

const SelectAsAnswer = styled.div`
  visibility: ${({ canMarkAsAnswer }) =>
    canMarkAsAnswer ? 'visible' : 'hidden'};
  text-align: center;
  color: rgba(0, 0, 0, 0.5);
  font-weight: bold;
  flex: 1 1 auto;

  &:hover {
    cursor: pointer;
  }
`;

const LikesWrapper = styled.div`
  font-weight: bold;
  flex: 1 1 auto;

  &:hover {
    cursor: pointer;
  }
`;

const Answer = ({
  result,
  handleAnswerEdit,
  answer_idx,
  answerSelected,
  canMarkAsAnswer,
}) => {
  const [answerContent, setAnswerContent] = useState(result.answer_content);
  const [dropDownClick, setDropDownClick] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [confirmDropdown, setConfirmDropdown] = useState(false);
  const [noAuthDialog, setNoAuthDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const intoEditMode = async (e) => {
    setDropDownClick(false);
    if (editMode) return;
    let checkAuth;
    try {
      checkAuth = await axios.get('https://pinkdevsaurus.tk/auth', {
        withCredentials: true,
      });
    } catch (err) {
      setErrorMessage('요청하신 게시물을 수정할 권한이 없습니다.');
      return setNoAuthDialog(true);
    }

    if (checkAuth.data.result.user_id !== result.user_id) {
      setErrorMessage('요청하신 게시물을 수정할 권한이 없습니다.');
      return setNoAuthDialog(true);
    }

    setEditMode(true);
  };

  const cancelEditMode = (e) => {
    setAnswerContent(result.answer_content);
    setEditMode(false);
  };

  const handleEditFinish = (newContent) => {
    setEditMode(false);
    handleAnswerEdit(newContent, result.answer_id, answer_idx);
    setAnswerContent(newContent);
  };

  const handleDropDownClick = (e) => {
    setDropDownClick(!dropDownClick);
  };

  const handleDelete = (e) => {
    setDropDownClick(false);
    setConfirmDropdown(true);
  };

  const handleDeleteConfirm = (result) => {
    setConfirmDropdown(false);
    if (!result) return;
    //fetch and delete content
    console.log('called');
  };

  const markAsAnswerHandler = async (e) => {
    console.dir(result);

    let markAsAnswer;
    try {
      markAsAnswer = await axios.put(
        `https://pinkdevsaurus.tk/best-answer/${result.answer_id}`,
        { selected_user_id: result.user_id },
        { withCredentials: true }
      );
    } catch (err) {
      console.dir(err);
      setErrorMessage('답변 채택에 실패하였습니다. 관리자에게 문의하세요.');
      setNoAuthDialog(true);
      return;
    }

    window.location.reload();
  };

  return (
    <AnswerContainer>
      {noAuthDialog ? (
        <SimpleOKModal
          handleOK={() => setNoAuthDialog(false)}
          Message={errorMessage}
        />
      ) : (
        false
      )}
      <AnswerInfoWrapper>
        <UserInfoWrapper>
          <Userinfo user={result} answerSelected={answerSelected} />
        </UserInfoWrapper>
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
          {confirmDropdown ? (
            <DeleteConfirm handleDelete={handleDeleteConfirm}></DeleteConfirm>
          ) : (
            false
          )}
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
      <SelectAsAnswerAndLikesContainer>
        <SelectAsAnswer
          canMarkAsAnswer={canMarkAsAnswer}
          onClick={markAsAnswerHandler}
        >
          ✅ 답변으로 채택하기
        </SelectAsAnswer>
        <SelectAsAnswerAndLikesMiddleWrapper />
        <LikesWrapper>❤️ {result.answer_likes} likes</LikesWrapper>
      </SelectAsAnswerAndLikesContainer>
    </AnswerContainer>
  );
};

export default Answer;
