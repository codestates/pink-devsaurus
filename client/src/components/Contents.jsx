import React, { useState } from 'react';
import Content from './Content';
import styled from 'styled-components';

const ContentsWrapper = styled.div`
  width: 100%;
  right: 0;
  background-color: var(--white);
  padding: 1% 5%;

  > a:nth-child(10) > div {
    border-bottom: none !important;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 0.2vmax 0;
`;

const Button = styled.button`
  font-size: 1vmax;
  margin-right: 1vmax;
  padding: 0 0.4vmax;
`;

const Contents = () => {
  const dummy = {
    result: [
      {
        board_id: 1,
        title: '궁금한 점이 있어 질문',
        likes: 3,
        author: 'Nickname',
        created_at: '2020-04-01T00:00:00.000Z',
        answers: 4,
        answered_user_id: 20,
        category:
          'https://github.githubassets.com/images/icons/emoji/unicode/1f4f1.png',
      },
      {
        board_id: 2,
        title: 'How do you use coronaasdas',
        likes: 3,
        author: 'Nickname',
        created_at: '2020-04-01T00:00:00.000Z',
        answers: 4,
        answered_user_id: 20,
        category:
          'https://github.githubassets.com/images/icons/emoji/unicode/1f4f1.png',
      },
      {
        board_id: 3,
        title: 'How do you use coronasadassd',
        likes: 3,
        author: 'Nickname',
        created_at: '2020-04-01T00:00:00.000Z',
        answers: 4,
        answered_user_id: 20,
        category:
          'https://github.githubassets.com/images/icons/emoji/unicode/1f4f1.png',
      },
      {
        board_id: 4,
        title: 'How do yadsfdou use coronasadassd',
        likes: 3,
        author: 'Nickname',
        created_at: '2020-04-01T00:00:00.000Z',
        answers: 4,
        answered_user_id: 20,
        category:
          'https://github.githubassets.com/images/icons/emoji/unicode/1f4f1.png',
      },
      {
        board_id: 5,
        title: 'How do yadsfdou use coronasadassd',
        likes: 3,
        author: 'Nickname',
        created_at: '2020-04-01T00:00:00.000Z',
        answers: 4,
        answered_user_id: 20,
        category:
          'https://github.githubassets.com/images/icons/emoji/unicode/1f4f1.png',
      },
      {
        board_id: 6,
        title: 'How do yadsfdou use coronasadassd',
        likes: 3,
        author: 'Nickname',
        created_at: '2020-04-01T00:00:00.000Z',
        answers: 4,
        answered_user_id: 20,
        category:
          'https://github.githubassets.com/images/icons/emoji/unicode/1f4f1.png',
      },
      {
        board_id: 7,
        title: 'How do yadsfdou use coronasadassd',
        likes: 3,
        author: 'Nickname',
        created_at: '2020-04-01T00:00:00.000Z',
        answers: 4,
        answered_user_id: 20,
        category:
          'https://github.githubassets.com/images/icons/emoji/unicode/1f4f1.png',
      },
      {
        board_id: 8,
        title: 'How do yadsfdou use coronasadassd',
        likes: 3,
        author: 'Nickname',
        created_at: '2020-04-01T00:00:00.000Z',
        answers: 4,
        answered_user_id: 20,
        category:
          'https://github.githubassets.com/images/icons/emoji/unicode/1f4f1.png',
      },
      {
        board_id: 9,
        title: 'How do yadsfdou use coronasadassd',
        likes: 3,
        author: 'Nickname',
        created_at: '2020-04-01T00:00:00.000Z',
        answers: 4,
        answered_user_id: 20,
        category:
          'https://github.githubassets.com/images/icons/emoji/unicode/1f4f1.png',
      },
      {
        board_id: 10,
        title: 'How do yadsfdou use coronasadassd',
        likes: 3,
        author: 'Nickname',
        created_at: '2020-04-01T00:00:00.000Z',
        answers: 4,
        answered_user_id: 20,
        category:
          'https://github.githubassets.com/images/icons/emoji/unicode/1f4f1.png',
      },
    ],
  };

  const [pagenation, setPagenation] = useState([1, 2, 3, 4, 5]);

  const goPreviousPage = () => {
    if (pagenation[0] !== 1) {
      setPagenation(pagenation.map((num) => num - 5));
    }
  };

  const goNextPage = () => {
    // 100에 마지막 페이지
    if (pagenation[4] !== 100) {
      setPagenation(pagenation.map((num) => num + 5));
    }
  };

  return (
    <ContentsWrapper>
      {dummy.result.map((item, idx) => (
        <Content key={idx} data={item}></Content>
      ))}
      <ButtonWrapper>
        <Button onClick={goPreviousPage}>&lt;</Button>
        {pagenation.map((num, idx) => (
          <Button key={idx} onClick={''}>
            {num}
          </Button>
        ))}
        <Button onClick={goNextPage}>&gt;</Button>
      </ButtonWrapper>
    </ContentsWrapper>
  );
};

export default Contents;
