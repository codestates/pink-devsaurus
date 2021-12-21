// 담당자 : 김경봉 (Front-end)
// 2021-12-17 15:10:14

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import DropdownProfile from './DropdownProfile';

const Head = styled.header`
  width: 100%;
  display: flex;
  position: fixed;
  top: 0;
  justify-content: space-between;
  background-color: var(--white);
  border-bottom: 1px solid rgba(168, 168, 168, 0.7);
  align-items: center;
  padding: 0.2vmax;
  z-index: 999;
`;

const Img = styled.img`
  width: 6%;
  min-width: 5vmax;
  margin-left: 1%;
`;

const Button = styled.div`
  color: var(--pure-white);
  min-width: 14vmax;
  background-color: var(--pink);
  padding: 1.2vmax 3vmax;
  border-radius: 40px;
  font-size: 1.6vmax;
  white-space: nowrap;
  font-weight: 700;
  text-align: center;
  flex: 0.1 0 0;

  :hover {
    opacity: 0.8;
    cursor: pointer;
  }
`;

const WrapperSign = styled.div`
  display: flex;
  margin-right: 1%;
  min-width: 240px;
`;

const ButtonSignIn = styled.div`
  color: #fa7570;
  padding: 0.8vmax 1.5vmax;
  background-color: var(--white);
  border: 2px solid transparent;
  font-weight: 400;
  min-width: 5vmax;
  margin-left: 5px;
  border-radius: 10px;

  :hover {
    background-color: #ffd3c2;
    cursor: pointer;
  }
`;

const ButtonSignUp = styled.div`
  padding: 0.8vmax 1.5vmax;
  background-color: var(--white);
  color: #fa7570;
  font-weight: 400;
  border-radius: 10px;
  border: 2px solid #ffd3c2;
  min-width: 5vmax;
  margin-left: 5px;
  border-radius: 10px;

  :hover {
    background-color: #ffd3c2;
    cursor: pointer;
  }
`;

const Header = ({ isLogin, setIsLogin }) => {
  return (
    <Head>
      <Img src="https://raw.githubusercontent.com/exxocism/exxo-file-share/master/Wireframe/pinkDevelopSaurus.png" />
      <Link to="/">
        <Button>Q &amp; A' s</Button>
      </Link>
      <Link to="/myqna">
        <Button>My Q &amp; A</Button>
      </Link>
      <SearchBar></SearchBar>
      <Link to="/write">
        <Button>질문하기</Button>
      </Link>
      {/* 로그인 했으면 프로필 아이콘 / 로그인 안했으면 로그인, 회원가입 버튼 */}
      {isLogin ? (
        <DropdownProfile setIsLogin={setIsLogin} ></DropdownProfile>
      ) : (
        <WrapperSign>
          <Link to="/login">
            <ButtonSignIn>로그인</ButtonSignIn>
          </Link>
          <Link to="/signup">
            <ButtonSignUp>회원가입</ButtonSignUp>
          </Link>
        </WrapperSign>
      )}
    </Head>
  );
};

export default Header;
