// 담당자 : 김경봉 (Front-end)
// 2021-12-17 15:10:14

import React, { useState } from 'react';
import styled from 'styled-components';

const Dropdown = styled.div`
  position: relative;
  display: inline-block;
  margin-right: 3%;
`;

const Profile = styled.button`
  width: 5rem;
  height: 5rem;
  background-color: pink;
  border-radius: 100%;
  border: none;
  cursor: pointer;
`;

const DropdownContents = styled.ul`
  display: ${(props) => (props.show ? 'block' : 'none')};
  background-color: #F9F9F9;
  font-size: 1.3rem;
  position: absolute;
  right: 1%;
  width: 240px;
  padding: 10px 0;
  border-radius: 20px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);

  ::before {
    content: '';
    position: absolute;
    top: -10%;
    right: 10%;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid #F9F9F9;
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
    background-color: #FFD3C2;
    cursor: pointer;
  }
`;

const DropdownProfile = () => {
  const [show, setShow] = useState(false);

  return (
    <Dropdown>
      <Profile
        onClick={() => setShow(!show)}
        onBlur={() => setShow(false)}
      ></Profile>
      <DropdownContents show={show}>
        <DropdownLable>{`Signed in as ${'유저'}`}</DropdownLable>
        <DropdownContent>마이페이지</DropdownContent>
        <DropdownContent>로그아웃</DropdownContent>
      </DropdownContents>
    </Dropdown>
  );
};

export default DropdownProfile;
