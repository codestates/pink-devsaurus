import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  height: 100vh;
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

const LoginContainer = styled.div`
  width: 330px;
  background-color: var(--white);
  padding: 35px;
  border-radius: 15px;
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

  span {
    color: red;
    font-size: 13px;
    font-weight: bold;
    margin-top: -27px;
    margin-bottom: 30px;
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

const Login = ({ setIsLogin }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const loginHandler = async () => {
    if (!userName || !password) {
      throw new Error('???????????? ??????????????? ??????????????????.');
    }
    let result;
    try {
      result = await axios.post(
        'https://pinkdevsaurus.tk/login',
        {
          username: userName,
          password: password,
        },
        { withCredentials: true }
      );
    } catch (err) {
      setErrMsg('??????????????? ??????????????? ???????????? ????????????.');
    }
    if (result) {
      navigate('/');
      setIsLogin(true);
    }
  };

  return (
    <Container>
      <Link to="/">
        <Icon src="https://ifh.cc/g/rO5WOi.png"></Icon>
      </Link>
      <LoginContainer>
        <Form>
          <div className="title">?????????</div>
          <input
            type="text"
            placeholder="????????????"
            onChange={handleUserName}
          ></input>
          <input
            type="password"
            placeholder="????????????"
            onChange={handlePassword}
          ></input>
          <span>{errMsg}</span>
          <button onClick={loginHandler}>?????????</button>
          <ul>
            <li>?????? ????????? ?????????????</li>
            <Link to="/signup">
              <li className="signup">?????? ??????</li>
            </Link>
          </ul>
        </Form>
      </LoginContainer>
    </Container>
  );
};

export default Login;
