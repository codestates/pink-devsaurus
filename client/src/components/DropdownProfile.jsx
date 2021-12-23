// 담당자 : 김경봉 (Front-end)
// 2021-12-17 15:10:14

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const Dropdown = styled.div`
  display: inline-block;
  margin-right: 3vmax;
`;

const Profile = styled.button`
  width: 4vmax;
  height: 4vmax;
  background-color: pink;
  border-radius: 100%;
  border: none;
  cursor: pointer;
`;

const DropdownContents = styled.ul`
  display: ${(props) => (props.show ? 'block' : 'none')};
  background-color: #f9f9f9;
  font-size: 1.3vmax;
  position: absolute;
  right: 3vmax;
  width: 15vmax;
  padding: 10px 0;
  border-radius: 20px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);

  ::before {
    content: '';
    position: absolute;
    top: -10%;
    right: 6%;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid #f9f9f9;
  }
`;

const DropdownLable = styled.li`
  padding: 10px;
  text-align: center;
  border-bottom: 1px solid var(--gray);
`;

const DropdownContent = styled.li`
  padding: 10px;
  text-align: center;

  :hover {
    background-color: #ffd3c2;
    cursor: pointer;
  }
`;

const DropdownProfile = ({ setIsLogin }) => {
  const [show, setShow] = useState(false);

  const logOut = () => {
    axios.get('https://pinkdevsaurus.tk/logout').then(() => {
      setIsLogin(false);
    });
  };

  return (
    <Dropdown>
      <Profile
        onClick={() => setShow(!show)}
        onBlur={() => setShow(false)}
      ></Profile>
      <DropdownContents show={show} onMouseDown={(e) => e.preventDefault()}>
        <DropdownLable>{`Signed in as ${'유저'}`}</DropdownLable>
        <Link to="/mypage">
          <DropdownContent>마이페이지</DropdownContent>
        </Link>
        <DropdownContent onClick={logOut}>로그아웃</DropdownContent>
      </DropdownContents>
    </Dropdown>
  );
};

export default DropdownProfile;
