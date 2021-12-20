import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Sidebar from '../components/Sidebar.jsx';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';
import Question from '../components/Question.jsx';
import Answer from '../components/Answer.jsx';
import Write from '../components/Write.jsx';

const fetchResult = {
  result: {
    title: '이거 어떻게 하면 되나요?',
    content: `질문이 있습니다. 어떻게 하는지 몰라서 질문을 드립니다.
    
    답변 부탁드립니다.`,
    likes: 10,
    username: 'johndoe',
    userprofile_img: 'https://avatars0.githubusercontent.com/u/1234?s=460&v=4',
    created_date: '2020-04-01T00:00:00.000Z',
    modify_date: '2020-04-02T00:00:00.000Z',
    answers: [
      {
        answer_username: 'rihanna',
        userprofile_img:
          'https://randomuser.me/api/portraits/thumb/women/75.jpg',
        answer_id: 1,
        answer_content: '그건 이렇게 하면 됩니다',
        created_date: '2020-04-01T00:00:00.000Z',
        modified_date: '2020-04-01T00:00:00.000Z',
        answer_likes: 12,
      },
      {
        answer_username: 'Charlie',
        userprofile_img: 'https://randomuser.me/api/portraits/thumb/men/75.jpg',
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

// const categories = {
//   result: [
//     {
//       category_name: 'View all',
//       category_image:
//         'https://github.githubassets.com/images/icons/emoji/unicode/1f4f1.png',
//     },
//     {
//       category_name: 'Database',
//       category_image:
//         'https://github.githubassets.com/images/icons/emoji/unicode/1f4f1.png',
//     },
//     {
//       category_name: 'JavaScript',
//       category_image:
//         'https://github.githubassets.com/images/icons/emoji/unicode/1f4f1.png',
//     },
//   ],
// };

// const MainScreen = styled.div`
//   margin-top: ${({ headerHeight }) => headerHeight.header}px;
//   margin-left: ${({ headerHeight }) => headerHeight.sidebar}px;
//   background-color: var(--white);
//   /* margin-bottom: 3rem; */
// `;

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

const Read = ({ articleID }) => {
  //const result = axios.get(`/api/articles/${articleID}`);
  const { result } = fetchResult;
  // const [headerSize, setHeaderSize] = useState({ header: 0, sidebar: 0 });
  // const headerRef = useRef();
  // const sidebarRef = useRef();

  const handleQuestionEdit = (questionName, newContent) => {
    fetchResult.result.title = questionName;
    fetchResult.result.content = newContent;
    //fetch new data
  };

  const handleAnswerEdit = (newContent) => {
    fetchResult.result.content = newContent;
    //fetch new data
  };

  const handleNewAnswer = (newContent) => {
    //fetch new data
    console.log(newContent);
  };

  // useLayoutEffect(() => {
  //   function updateSize() {
  //     setHeaderSize({
  //       header: headerRef.current.firstChild.clientHeight,
  //       sidebar: sidebarRef.current.firstChild.clientWidth,
  //     });
  //   }
  //   window.addEventListener('resize', updateSize);
  //   updateSize();
  //   return () => window.removeEventListener('resize', updateSize);
  // }, []);

  return (
    <>
      {/* <div ref={headerRef}>
        <Header />
      </div>
      <div ref={sidebarRef}>
        <Sidebar list={categories.result}></Sidebar>
      </div> */}
      {/* <MainScreen headerHeight={headerSize}> */}
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
      {/* </MainScreen> */}
      {/* <Footer /> */}
    </>
  );
};

export default Read;
