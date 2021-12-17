// 담당자 : 최민우 (Front-end)
// 2021-12-17 17:11:20

import { useState } from 'react';
import styled from 'styled-components';
import Editor from './Editor.jsx';
import MDEditor from '@uiw/react-md-editor';
import Userinfo from './UserInfo.jsx';

const fetchResult = {
  result: {
    title: 'How do you use coronavirus API into action?',
    content: `I'm loooking for the best way to let users export and download data in xml and csv format.

I have found a maatwebsite package to export excel and csv file.`,
    likes: 10,
    username: 'johndoe',
    userprofile_img: 'https://avatars0.githubusercontent.com/u/1234?s=460&v=4',
    created_date: '2020-04-01T00:00:00.000Z',
    modify_date: '2020-04-02T00:00:00.000Z',
    answers: [
      {
        answer_username: 'rihanna',
        userprofile_img:
          'https://avatars0.githubusercontent.com/u/1234?s=460&v=4',
        answer_id: 1,
        answer_content: 'blah blah blah',
        created_date: '2020-04-01T00:00:00.000Z',
        modified_date: '2020-04-01T00:00:00.000Z',
        answer_likes: 12,
      },
    ],
    answered: 0,
  },
};

const QuestionContainer = styled.div`
  padding: 1rem;
`;

const QuestionNameWrapper = styled.div`
  display: flex;
`;

const QuestionName = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
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
  visibility: ${(props) => (props.cDate !== props.mDate ? 'visible' : 'hidden')};
`;

const DropdownButton = styled.span`
  color: rgb(32, 20, 20);
  background-color: lightgray;
  border-radius: 0.5rem;
  padding: 0.1rem 0.5rem;
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
  font-size: 1.5rem;
  font-weight: bold;
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

const Question = (props) => {
  const { result } = fetchResult;

  const [editMode, setEditMode] = useState(false);
  const [questionName, setQuestionName] = useState(result.title);
  const [questionContent, setQuestionContent] = useState(result.content);

  const intoEditMode = (e) => {
    if( editMode ) return ;
    setEditMode(true);
  };

  const cancelEditMode = (e) => {
    setQuestionName( result.title );
    setQuestionContent( result.content );
    setEditMode(false);
  };

  const handleEditFinish = ( newContent ) => {
    setEditMode(false);
    //setQuestionName();

    //fetch and edit content
    fetchResult.result.title = questionName;
    fetchResult.result.content = newContent;

    setQuestionContent(newContent);    
  };

  return (
    <QuestionContainer>
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
          <IsModified cDate={result.created_date} mDate={result.modify_date}>modified</IsModified>
        </IsModifiedWrapper>
        <DropdownButtonWrapper>
          <DropdownButton onClick={intoEditMode}>...</DropdownButton>
        </DropdownButtonWrapper>
      </QuestionNameWrapper>
      <UserInfoWrapper>
        <Userinfo user={result} />
      </UserInfoWrapper>
      {editMode ? (
        <Editor text={questionContent} handleEditFinish={handleEditFinish} handleCancel={cancelEditMode} />
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
