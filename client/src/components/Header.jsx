// 담당자 : 김경봉 (Front-end)
// 2021-12-17 15:10:14

import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import DropdownProfile from './DropdownProfile';

const Head = styled.header`
  width: 90%;
  display: flex;
  position: fixed;
  top: 3vmax;
  left: 50%;
  transform: translate(-50%, 0%);
  justify-content: space-between;
  background-color: #fafafa;
  box-shadow: 0px 10px 10px -5px rgba(0, 0, 0, 0.15);
  border-radius: 30px 30px 0 0;
  align-items: center;
  padding: 0.2vmax;
  z-index: 999;

  > a:first-child {
    width: 5vmax;
    margin-left: 3%;
  }
`;

const Img = styled.img`
  width: 3%;
  min-width: 5vmax;
`;

const Button = styled.div`
  color: var(--pure-white);
  min-width: 10vmax;
  background-color: #f1aaa9;
  padding: 0.8vmax 2.5vmax;
  border-radius: 40px;
  font-size: 1.2vmax;
  white-space: nowrap;
  font-weight: 700;
  text-align: center;
  flex: 0.1 0 0;

  :hover {
    background-color: #f1d2d3;
    cursor: pointer;
  }
`;

const WrapperSign = styled.div`
  display: flex;
  margin-right: 3%;
  font-size: 1vmax;
`;

const ButtonSignIn = styled.div`
  color: #fa7570;
  padding: 0.8vmax 1.5vmax;
  background-color: #fafafa;
  border: 1px solid transparent;
  font-weight: 400;
  white-space: nowrap;
  margin-left: 5px;
  border-radius: 10px;

  :hover {
    color: var(--pure-white);
    background-color: #f1aaa9;
    cursor: pointer;
  }
`;

const ButtonSignUp = styled.div`
  padding: 0.8vmax 1.5vmax;
  background-color: #fafafa;
  color: #fa7570;
  font-weight: 400;
  border-radius: 10px;
  border: 1px solid #f1aaa9;
  white-space: nowrap;
  margin-left: 5px;
  border-radius: 10px;

  :hover {
    background-color: #f1aaa9;
    color: var(--pure-white);
    cursor: pointer;
  }
`;

const Header = ({ isLogin, setIsLogin, username }) => {
  return (
    <Head>
      <Link to="/">
        <div>
          <Img src="https://ifh.cc/g/rO5WOi.png" />
        </div>
      </Link>
      <Link to="/">
        <Button>Q &amp; A' s</Button>
      </Link>
      <Link to={isLogin ? '/myqna' : '/login'}>
        <Button>My Q &amp; A</Button>
      </Link>
      <SearchBar></SearchBar>
      <Link to="/write">
        <Button>질문하기</Button>
      </Link>
      {isLogin ? (
        <DropdownProfile
          username={username}
          setIsLogin={setIsLogin}
        ></DropdownProfile>
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
