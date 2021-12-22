import { useState, useLayoutEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import Sidebar from '../components/Sidebar.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Question from '../components/Question.jsx';
import Answer from '../components/Answer.jsx';
import Write from '../components/Write.jsx';
import Loading from '../components/Loading.jsx';

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
  const [result, setResult] = useState(null);

  useLayoutEffect(() => {
    async function fetchData() {
      const parsed = location.pathname.split('/')[2];
      const fetchResult = await axios.get(
        `https://pinkdevsaurus.tk/questions/${parsed}`,
        { withCredentials: true }
      );
      const answerResult = await axios.get(
        `https://pinkdevsaurus.tk/questions/answers/${parsed}`,
        { withCredentials: true }
      );
      const { answer: answers } = answerResult.data;
      setResult({
        ...fetchResult.data.result,
        answers,
      });
      console.dir({
        ...fetchResult.data.result,
        answers,
      });
    }
    fetchData();
  }, []);

  const handleQuestionEdit = async (questionName, newContent) => {
    if (questionName === '') return alert('질문 이름을 입력해주세요.');
    if (newContent === '') return alert('내용을 입력해주세요.');

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
      return alert('질문글 수정에 실패했습니다. 관리자에게 문의해 주세요.');
    }

    console.dir(editResult);
    result.title = questionName;
    result.content = newContent;
  };

  const handleAnswerEdit = async (newContent, answerID, answer_idx) => {
    if (newContent === '') return alert('내용을 입력해주세요.');

    let editResult;
    try {
      editResult = await axios.put(
        `https://pinkdevsaurus.tk/answers/${answerID}`,
        { content: newContent },
        { withCredentials: true }
      );
    } catch (err) {
      console.log(err);
      return alert('답변글 수정에 실패했습니다. 관리자에게 문의해 주세요.');
    }

    result.answers[answer_idx].answer_content = newContent;
  };

  const handleNewAnswer = async (newContent) => {
    if (newContent === '') return alert('내용을 입력해주세요.');

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
      return alert('답변글 작성에 실패했습니다. 관리자에게 문의해 주세요.');
    }

    window.location.reload();
  };

  if (!result) return <Loading />;
  return (
    <>
      <Question result={result} handleQuestionEdit={handleQuestionEdit} />
      <HorizontalLine bottom={1} />
      {result['answers']?.map((answer, index) => {
        return (
          <Left key={index}>
            <Answer
              key={index}
              answer_idx={index}
              result={answer}
              answerSelected={result.selected_answer_id || 0}
              handleAnswerEdit={handleAnswerEdit}
              authorID={result.user_id}
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
