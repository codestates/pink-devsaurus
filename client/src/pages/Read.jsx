import { useState, useLayoutEffect, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

import Question from '../components/Question.jsx';
import Answer from '../components/Answer.jsx';
import Write from '../components/Write.jsx';
import Loading from '../components/Loading.jsx';
import SimpleOKModal from '../components/SimpleOKModal.jsx';

const HorizontalLine = styled.div`
  border-left-width: 0;
  border-right-width: 0;
  border-top-width: 0;
  border-bottom-width: 0.15px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.3);
  margin-bottom: ${({ bottom }) => (bottom ? bottom : 0)}rem;
`;

const Left = styled.div`
  margin-left: 1rem;
`;

const Read = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [canMarkAsAnswer, setCanMarkAsAnswer] = useState(false);
  const [writeCanceledDialog, setWriteCanceledDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [reload, setReload] = useState(false);

  async function fetchData() {
    const boardID = location.pathname.split('/')[2];
    let fetchResult;

    try {
      fetchResult = await axios.get(
        `https://pinkdevsaurus.tk/questions/${boardID}`,
        { withCredentials: true }
      );
    } catch (err) {
      console.dir(err);
      setErrorMessage('질문을 불러오지 못했습니다. 관리자에게 문의하세요.');
      setWriteCanceledDialog(true);
      return;
    }

    let answerResult;
    try {
      answerResult = await axios.get(
        `https://pinkdevsaurus.tk/questions/answers/${boardID}`,
        { withCredentials: true }
      );
    } catch (err) {
      console.dir(err);
      setErrorMessage('답변을 불러오지 못했습니다. 관리자에게 문의하세요.');
      setWriteCanceledDialog(true);
      return;
    }

    const { answer: answers } = answerResult.data;
    setResult({
      ...fetchResult.data.result,
      answers,
    });

    // console.dir({
    //   ...fetchResult.data.result,
    //   answers,
    // });

    if (fetchResult.data.result.selected_answer_id) {
      setCanMarkAsAnswer(false);
      return;
    }

    let checkAuth;
    try {
      checkAuth = await axios.get('https://pinkdevsaurus.tk/auth', {
        withCredentials: true,
      });
    } catch (err) {
      setCanMarkAsAnswer(false);
      return;
    }

    if (checkAuth.data.result.user_id === fetchResult.data.result.user_id) {
      setCanMarkAsAnswer(true);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      fetchData();
    }, 500);
  }, [reload]);

  useLayoutEffect(() => {
    fetchData();
  }, []);

  const handleQuestionEdit = async (questionName, newContent) => {
    if (questionName === '') {
      setErrorMessage('질문 이름을 입력해주세요.');
      setWriteCanceledDialog(true);
      return;
    }
    if (newContent === '') {
      setErrorMessage('내용을 입력해주세요.');
      setWriteCanceledDialog(true);
      return;
    }

    let editResult;
    try {
      const payload = {
        title: questionName,
        content: newContent,
      };
      editResult = await axios.put(
        `https://pinkdevsaurus.tk/questions/${location.pathname.split('/')[2]}`,
        payload,
        { withCredentials: true }
      );
    } catch (err) {
      console.log(err);
      setErrorMessage('질문글 수정에 실패했습니다. 관리자에게 문의해 주세요.');
      setWriteCanceledDialog(true);
      return;
    }

    setReload(!reload);
  };

  const handleAnswerEdit = async (newContent, answerID) => {
    if (newContent === '') {
      setErrorMessage('내용을 입력해주세요.');
      setWriteCanceledDialog(true);
      return;
    }

    let editResult;
    try {
      editResult = await axios.put(
        `https://pinkdevsaurus.tk/answers/${answerID}`,
        { content: newContent },
        { withCredentials: true }
      );
    } catch (err) {
      console.log(err);
      setErrorMessage('답변글 수정에 실패했습니다. 관리자에게 문의해 주세요.');
      setWriteCanceledDialog(true);
      return;
    }

    setReload(!reload);
  };

  const handleNewAnswer = async (newContent) => {
    if (newContent === '') {
      setErrorMessage('내용을 입력해주세요.');
      setWriteCanceledDialog(true);
      return;
    }

    const payload = {
      board_id: location.pathname.split('/')[2],
      content: newContent,
    };

    let writeAnswerResult;
    try {
      writeAnswerResult = await axios.post(
        `https://pinkdevsaurus.tk/answers`,
        payload,
        { withCredentials: true }
      );
    } catch (err) {
      console.log(err);
      setErrorMessage('답변글 작성에 실패했습니다. 관리자에게 문의해 주세요.');
      setWriteCanceledDialog(true);
      return;
    }

    setReload(!reload);
  };

  const handleCheckAnswer = () => {
    setReload(!reload);
  };

  const handleQuestionDelete = async (questionID) => {
    let deleteResult;
    try {
      deleteResult = await axios.delete(
        `https://pinkdevsaurus.tk/questions/${questionID}`,
        { withCredentials: true }
      );
    } catch (err) {
      console.log(err);
      setErrorMessage('질문글 삭제에 실패했습니다. 관리자에게 문의해 주세요.');
      setWriteCanceledDialog(true);
      return;
    }

    navigate('/');
  };

  const handleAnswerDelete = async (answerID) => {
    let deleteResult;
    try {
      deleteResult = await axios.delete(
        `https://pinkdevsaurus.tk/answers/${answerID}`,
        { withCredentials: true }
      );
    } catch (err) {
      console.log(err);
      setErrorMessage('답변글 삭제에 실패했습니다. 관리자에게 문의해 주세요.');
      setWriteCanceledDialog(true);
      return;
    }

    setReload(!reload);
  };

  if (!result) return <Loading />;

  return (
    <>
      {writeCanceledDialog ? (
        <SimpleOKModal
          handleOK={() => setWriteCanceledDialog(false)}
          Message={errorMessage}
        />
      ) : (
        false
      )}
      <Question
        result={result}
        handleQuestionEdit={handleQuestionEdit}
        handleQuestionDelete={handleQuestionDelete}
        handleQuestionLike={handleCheckAnswer}
      />
      <HorizontalLine bottom={1} />
      {result['answers']?.map((answer, index) => {
        return (
          <Left key={index}>
            <Answer
              key={index}
              result={answer}
              answerSelected={result.selected_answer_id || 0}
              handleAnswerEdit={handleAnswerEdit}
              canMarkAsAnswer={canMarkAsAnswer}
              handleCheckAnswer={handleCheckAnswer}
              handleAnswerDelete={handleAnswerDelete}
              handleAnswerLike={handleCheckAnswer}
            />
            <HorizontalLine />
          </Left>
        );
      })}
      <Write isQuestion={false} handleWriteSuccess={handleNewAnswer} />
    </>
  );
};

export default Read;
