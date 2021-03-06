import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Profile from '../components/Profile';
import Sidebar from '../components/Sidebar';
import DeleteAccountModal from '../components/DeleteAccountModal';
import axios from 'axios';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const SpeechBubbleWrapper = styled.div`
  position: relative;
  visibility: hidden;
  background-color: grey;
  z-index: 999;
  &:hover {
    visibility: visible;
  }
`;

const SpeechBubble = styled.div`
  position: fixed;
  bottom: 4em;
  left: 2em;
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
  z-index: 999;

  &:before {
    content: '';
    position: absolute;
    bottom: -25px;
    left: 50%;
    margin-left: -15px;
    border: 15px solid transparent;
    border-top: 15px solid #70a6ff;
  }
`;

const Icon = styled.img`
  visibility: visible;
  position: fixed;
  bottom: 1px;
  left: 30px;
  height: 4em;
  width: 4em;
  cursor: pointer;
`;

const MyPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    axios
      .get('https://pinkdevsaurus.tk/auth', {
        withCredentials: true,
      })
      .then((res) => {
        setUserInfo(res.data.result);
        console.log(userInfo);
      })
      .catch((err) => {
        return;
      });
  }, []);

  const modalHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Wrapper>
      <Sidebar
        list={[{ category_name: '나의 정보' }, { category_name: 'My Q & A' }]}
      />
      {isOpen ? (
        <DeleteAccountModal
          userName={userInfo['username']}
          userId={userInfo['user_id']}
          modalHandler={modalHandler}
        />
      ) : null}
      <Profile userInfo={userInfo} />
      <SpeechBubbleWrapper>
        <SpeechBubble>탈퇴하기</SpeechBubble>
        <Icon
          onClick={modalHandler}
          src="https://uploda1.ysklog.net/uploda/e17e09ad58.png"
        />
      </SpeechBubbleWrapper>
    </Wrapper>
  );
};

export default MyPage;
