import React from 'react';
import Content from './Content';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  flex: 7.5 0 0;
  background-color: var(--white);
  padding: 1% 5%;
`;

const Contents = () => {
  const dummy = {
    result: [
      {
        board_id: 1,
        title: 'How do you use corona',
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
        title: 'How do yafsdaou use coronasadassd',
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

  return (
    <Wrapper>
      {dummy.result.map((item, idx) => (
        <Content key={idx} data={item}></Content>
      ))}
    </Wrapper>
  );
};

export default Contents;
