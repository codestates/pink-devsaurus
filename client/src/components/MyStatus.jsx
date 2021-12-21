import React from 'react';
import styled from 'styled-components';

// 카에
// 2021-12-20 13:06:07

const StatusContainer = styled.div`
  width: 100%;
  right: 0;
  padding: 1% 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  align-items: center;
  background-color: var(--white);
  padding-top: 30px;
`;

const Image = styled.img`
  width: 15vmax;
  height: 15vmax;
  border-radius: 50%;
  margin-right: 80px;
  border: 1px solid lightgray;
`;

const Status = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const UserName = styled.div`
  font-size: 2vmax;
  font-weight: bold;
  margin-bottom: 30px;
`;

const UserData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 8px;

  > .user-info {
    font-size: 1.5vmax;
    margin-bottom: 1rem;
  }
`;

const Buttons = styled.div`
  button {
    height: 4vmax;
    width: 10vmax;
    border-radius: 25px;
    color: var(--pure-white);
    background-color: var(--pink);
    font-weight: 500;
    border: none;
    font-size: 1.3vmax;
    cursor: pointer;
    margin-bottom: 10px;
  }

  button:first-child {
    margin-left: -23px;
    margin-right: 15px;
  }

  button:hover {
    opacity: 0.8;
  }
`;

const Mystatus = () => {
  return (
    <StatusContainer>
      <Image src='https://ifh.cc/g/rO5WOi.png' />
      <Status>
        <UserName>{`유저네임 : hello`}</UserName>
        <UserData>
          <div className='user-info'>{`나의 질문 수 : 0 개`}</div>
          <div className='user-info'>{`나의 답변 수 : 0 개`}</div>
          <div className='user-info'>{`채택된 답변 : 0 개`}</div>
          <div className='user-info'>{`채택율 : 0 %`}</div>
        </UserData>
        <Buttons>
          <button>나의 질문 보기</button>
          <button>나의 댓글 보기</button>
        </Buttons>
      </Status>
    </StatusContainer>
  );
};

export default Mystatus;
