import React from 'react';
import styled from 'styled-components';

// 카에
// 2021-12-20 13:06:07

const StatusContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  width: 75%;
  margin-left: 25%;
  align-items: center;
  background-color: var(--white);
`;

const Image = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-bottom: 10px;
  border: 1px solid lightgray;
  margin-right: 30px;
`;

const Status = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;

const UserName = styled.div`
  font-size: 23px;
  font-weight: bold;
  margin-bottom: 30px;
`;

const UserData = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 30px;

  > .user-info {
    font-size: 15px;
    margin-bottom: 10px;
  }
`;

const Buttons = styled.div`
  button {
    height: 35px;
    width: 120px;
    border-radius: 20px;
    color: var(--pure-white);
    background-color: var(--pink);
    font-weight: 500;
    border: none;
    font-size: 13px;
    padding: 10px;
    cursor: pointer;
  }

  button:first-child {
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
