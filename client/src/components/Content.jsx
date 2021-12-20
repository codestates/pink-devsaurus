import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid rgba(168, 168, 168, 0.7);
  padding: 1%;

  > div {
    padding: 1%;
  }

  :hover {
    background-color: var(--pink);
  }
`;

const Icon = styled.div`
  flex: 1 0 0;
  min-width: 11vmax;

  > img {
    width: 80%;
    max-height: 18vmax;
  }
`;

const Title = styled.div`
  flex: 5 0 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  > div {
    /* white-space: nowrap; */

    :first-child {
      font-size: 2vmax;
      font-weight: 700;
    }

    :nth-child(2) {
      font-size: 1.5vmax;
      color: #494949;
      font-weight: 600;

      > span {
        margin-right: 5%;
      }
    }

    :last-child {
      color: var(--gray);
      font-size: 1.5vmax;
      font-weight: 600;
    }
  }
`;

const AnswerNumber = styled.div`
  flex: 1 0 0;
  text-align: center;
  min-width: 12.5vmax;
  display: flex;
  flex-direction: column;
  justify-content: center;

  > div {
    font-size: 2vmax;
    font-weight: bold;
    margin-bottom: 5%;
  }
`;

const Content = ({ data }) => {
  const {
    board_id,
    title,
    likes,
    author,
    created_at,
    answers,
    answered_user_id,
    category,
  } = data;

  return (
    <Wrapper>
      <Icon>
        <img src={category}></img>
      </Icon>
      <Title>
        <div>{title}</div>
        <div>
          <span>{author}</span>
          <span>{created_at.slice(0, 10)}</span>
        </div>
        <div>{likes} Likes</div>
      </Title>
      <AnswerNumber>
        <div>답변</div>
        <div>{answers}</div>
      </AnswerNumber>
    </Wrapper>
  );
};

export default Content;
