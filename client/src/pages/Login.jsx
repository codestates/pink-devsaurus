import React, { useState } from 'react';
import styled from 'styled-components';
// import { Link } from 'react-router-dom';

const LoginContainer = styled.div`
  width: 330px;
  background-color: var(--white);
  padding: 35px;
  border-radius: 15px;
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
    cursor: pointer;
    font-size: 18px;
    margin-bottom: 10px;
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

const Login = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleClick = () => {
  };

  return (
      <LoginContainer>
        <Form>
          <div className='title'>로그인</div>
          <input placeholder='유저네임' onChange={handleUserName}></input>
          <input placeholder='비밀번호' onChange={handlePassword}></input>
          <button onClick={handleClick}>로그인</button>
          <ul>
            <li>아직 회원이 아니세요?</li>
            <li className='signup'>회원 가입</li>
          </ul>
        </Form>
      </LoginContainer>
  );
}

export default Login;