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
  border-color: var(--gray);
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
        `http://39.122.166.33:8000/questions/${parsed}`,
        { withCredentials: true }
      );
      const answerResult = await axios.get(
        `http://39.122.166.33:8000/questions/answers/${parsed}`,
        { withCredentials: true }
      );
      const { answer: answers } = answerResult.data;
      setResult({
        ...fetchResult.data.result,
        answers,
      });
    }
    fetchData();
  }, []);

  const handleQuestionEdit = (questionName, newContent) => {
    result.title = questionName;
    result.content = newContent;
    //fetch new data
  };

  const handleAnswerEdit = (newContent) => {
    result.content = newContent;
    //fetch new data
  };

  const handleNewAnswer = (newContent) => {
    //fetch new data
    console.log(newContent);
  };

  if (!result) return <Loading />;
  return (
    <>
      <Question result={result} handleQuestionEdit={handleQuestionEdit} />
      <HorizontalLine bottom={1.5} />
      {result['answers']?.map((answer, index) => {
        return (
          <Left key={index}>
            <Answer
              key={index}
              result={answer}
              handleAnswerEdit={handleAnswerEdit}
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
