import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid lightgray;
  padding: 1.5%;

  > div {
    padding: 1%;
  }

  :hover {
    border-bottom: none;
    border-radius: 20px;
    background-color: rgba(229, 112, 106, 0.3);
  }
`;

const Icon = styled.div`
  flex: 1 0 0;
  min-width: 8vmax;

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
    margin-bottom: 1.5%;

    :first-child {
      color: #333333;
      font-size: 1.3vmax;
      font-weight: 700;
    }

    :nth-child(2) {
      font-size: 1vmax;
      color: #494949;
      font-weight: 600;

      > span {
        margin-right: 5%;
      }
    }

    :last-child {
      color: var(--gray);
      font-size: 0.8vmax;
      font-weight: 600;
    }
  }
`;

const AnswerNumber = styled.div`
  flex: 1 0 0;
  text-align: center;
  min-width: 6vmax;
  display: flex;
  flex-direction: column;
  justify-content: center;

  > div {
    color: #333333;
    font-size: 1.3vmax;
    font-weight: bold;
    margin-bottom: 5%;
  }
`;

const Content = ({ data }) => {
  const { board_id, title, likes, author, modified_at, answers, category } =
    data;

  return (
    <Link to={`/read/${board_id}`}>
      <Wrapper>
        <Icon>
          <img src={category}></img>
        </Icon>
        <Title>
          <div>{title}</div>
          <div>
            <span>{author}</span>
            <span>{modified_at.slice(0, 10)}</span>
          </div>
          <div>{likes} Likes</div>
        </Title>
        <AnswerNumber>
          <div>답변</div>
          <div>{answers}</div>
        </AnswerNumber>
      </Wrapper>
    </Link>
  );
};

export default Content;
