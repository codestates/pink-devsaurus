import React, { useState } from 'react';
import styled from 'styled-components';
import Profile from '../components/Profile';
import Sidebar from '../components/Sidebar';
import DeleteAccountModal from '../components/DeleteAccountModal';

const SpeechBubbleWrapper = styled.div`
  visibility: hidden;
  background-color: grey;
  
  &:hover {
    visibility: visible;
  }
`;

const SpeechBubble = styled.div`
  display: inline-block;
  position: fixed;
  bottom: 75px;
  left: 40px;
  margin: 1.5em 0;
  padding: 0 5px;
  width: 90px;
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: #fff;
  font-size: 15px;
  font-weight: bold;
  background: #70a6ff;
  border-radius: 50%;
  box-sizing: border-box;

  &:before {
    content: '';
    position: absolute;
    bottom: -25px;
    left: 50%;
    margin-left: -15px;
    border: 15px solid transparent;
    border-top: 15px solid #70a6ff;
    z-index: 0;
  }
`;

const Icon = styled.img`
  visibility: visible;
  position: fixed;
  bottom: 8px;
  left: 30px;
  height: 80px;
  width: 80px;
  cursor: pointer;
`;

const MyPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const modalHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Sidebar
        list={[{ category_name: '나의 정보' }, { category_name: 'My Q & A' }]}
      />
      {isOpen ? <DeleteAccountModal modalHandler={modalHandler} /> : null}
      <Profile />
      <SpeechBubbleWrapper>
        <SpeechBubble>탈퇴하기</SpeechBubble>
        <Icon
          onClick={modalHandler}
          src='https://uploda1.ysklog.net/uploda/e17e09ad58.png'
        />
      </SpeechBubbleWrapper>
    </>
  );
};

export default MyPage;
