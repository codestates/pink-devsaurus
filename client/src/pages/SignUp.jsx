import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f1d2d3;
`;

const Icon = styled.img`
  position: fixed;
  top: 8px;
  left: 8px;
  height: 80px;
  width: 80px;
`;

const SignupContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 330px;
  padding: 35px;
  border-radius: 15px;
  background-color: var(--white);
  z-index: 100;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  .title {
    font-size: 32px;
    font-weight: bold;
    text-align: center;
    margin-bottom: 32px;
  }

  input {
    height: 35px;
    width: 100%;
    border-radius: 5px;
    outline: none;
    border: 1px solid lightgray;
    padding-left: 7px;
    margin-bottom: 30px;
  }

  input:last-child {
    margin-bottom: 0;
  }

  button {
    height: 35px;
    width: 100%;
    border-radius: 5px;
    color: var(--pure-white);
    background-color: var(--pink);
    font-weight: 500;
    border: none;
    font-size: 18px;
    margin-bottom: 10px;
    cursor: pointer;
  }

  button:hover {
    opacity: 0.8;
  }

  ul {
    display: flex;
    justify-content: space-between;
  }

  li {
    font-size: 13px;
  }

  .signup {
    cursor: pointer;
    font-weight: bold;
    padding-right: 15px;
  }

  .signup:hover {
    text-decoration: underline;
  }
`;

const ErrorMsg = styled.span`
  width: 100%;
  color: red;
  font-size: 13px;
  font-weight: bold;
  margin-top: -27px;
  margin-bottom: 30px;
`;

export default function Login() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userNameMsg, setUserNameMsg] = useState('');
  const [emailMsg, setEmailMsg] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');
  const [confirmPasswordMsg, setConfirmPasswordMsg] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  const isValidUserName = (userName) => {
    const regExp = new RegExp(/^[a-z0-9_-]{3,30}$/);
    if (regExp.test(userName)) {
      setUserNameMsg('');
    } else {
      setUserNameMsg(
        '3~30자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.'
      );
    }
  };

  const isValidEmail = (email) => {
    const regExp = new RegExp(
      /^([\w!#$%&'*+\-\/=?^`{|}~]+(\.[\w!#$%&'*+\-\/=?^`{|}~]+)*|"([\w!#$%&'*+\-\/=?^`{|}~. ()<>\[\]:;@,]|\\[\\"])+")@(([a-zA-Z\d\-]+\.)+[a-zA-Z]+|\[(\d{1,3}(\.\d{1,3}){3}|IPv6:[\da-fA-F]{0,4}(:[\da-fA-F]{0,4}){1,5}(:\d{1,3}(\.\d{1,3}){3}|(:[\da-fA-F]{0,4}){0,2}))\])$/
    );
    if (regExp.test(email)) {
      setEmailMsg('');
    } else {
      setEmailMsg('올바른 이메일 형식이 아닙니다.');
    }
  };

  const isValidPassword = (password) => {
    const regExp = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/
    );
    if (regExp.test(password)) {
      setPasswordMsg('');
    } else {
      setPasswordMsg(
        '8자 이상이어야 하며, 숫자/대문자/소문자/특수문자를 모두 포함해야 합니다.'
      );
    }
  };

  const handleUserName = (e) => {
    const text = e.target.value;
    setUserName(text);
    isValidUserName(text);
  };

  const handleEmail = (e) => {
    const text = e.target.value;
    setEmail(text);
    isValidEmail(text);
  };

  const handlePassword = (e) => {
    const text = e.target.value;
    setPassword(text);
    isValidPassword(text);
  };

  const handleConfirmPassword = (e) => {
    const text = e.target.value;
    if (text !== password) {
      setConfirmPasswordMsg('비밀번호가 일치하지 않습니다.');
    } else {
      setConfirmPasswordMsg('');
    }
  };

  const signUpHandler = async() => {
    if(!userName || !email || !password) {
      setErrMsg('모든 항목은 필수입니다');
      return;
    }

    let result;
    try {
      result = await axios.post('https://pinkdevsaurus.tk/sign-up', {
        email: email,
        password: password,
        username: userName,
      });
    }catch(err){
      return;
    }
    if(result.status === 201) {
      navigate('/login')
    }
  };

  return (
    <>
      <Container>
        <Link to='/'>
          <Icon src='https://ifh.cc/g/rO5WOi.png'></Icon>
        </Link>
        <SignupContainer>
          <Form>
            <div className='title'>회원 가입</div>
            <input
              type='text'
              placeholder='유저네임 (가입 후 변경 불가)'
              onChange={handleUserName}
            ></input>
            {userNameMsg ? <ErrorMsg>{userNameMsg}</ErrorMsg> : <></>}
            <input
              type='email'
              placeholder='이메일'
              onChange={handleEmail}
            ></input>
            {emailMsg ? <ErrorMsg>{emailMsg}</ErrorMsg> : <></>}
            <input
              type='password'
              placeholder='비밀번호'
              onChange={handlePassword}
            ></input>
            {passwordMsg ? <ErrorMsg>{passwordMsg}</ErrorMsg> : <></>}
            <input
              type='password'
              placeholder='비밀번호 재입력'
              onChange={handleConfirmPassword}
            ></input>
            {confirmPasswordMsg ? (
              <ErrorMsg>{confirmPasswordMsg}</ErrorMsg>
            ) : (
              <></>
            )}
            <button onClick={signUpHandler}>가입하기</button>
          </Form>
        </SignupContainer>
      </Container>
    </>
  );
}
