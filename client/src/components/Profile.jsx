import React, { useState } from 'react';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  /* top: 5.4vmax; */
  /* left: 27%; */
  /* display: flex;
  flex-direction: column;
  align-items: center; */
  background: pink;
  width: 100%;
  right: 0;
  padding: 4% 8% 2% 8%;
`;

const MyImage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    width: 10vmax;
    height: 10vmax;
    border-radius: 50%;
    margin-bottom: 2vmax;
    border: 1px solid lightgray;
  }

  > input {
    display: none;
  }

  > label {
    width: 100%;
    display: flex;
    justify-content: center;
    font-weight: bold;
    font-size: 1.5vmax;
    margin-bottom: 2vmax;
    cursor: pointer;

    :hover {
      color: hotpink;
      font-weight: bold;
    }
  }
`;

const MyInfo = styled.ul`
  display: flex;
  flex-direction: column;

  li {
    display: flex;
    flex-direction: column;
    margin-bottom: 2vmax;
  }
`;

const Title = styled.span`
  margin-bottom: 0.5vmax;
  font-weight: bold;
`;

const EditInput = styled.input`
  width: 30vmax;
  height: 3vmax;
  border: 1px solid lightgray;
  border-radius: 5px;
  outline: none;
  padding-left: 1vmax;
  font-size: 1.5vmax;
`;

const ErrorMsg = styled.div`
  width: 30vmax;
  color: red;
  font-size: 1.5vmax;
  font-weight: bold;
  margin-top: 0.5vmax;
`;

const Button = styled.button`
  height: 35px;
  width: 100px;
  border-radius: 5px;
  background-color: var(--pink);
  color: var(--pure-white);
  font-weight: bold;
  border: none;
  cursor: pointer;
  font-size: 15px;
  margin-bottom: 3vmax;

  &:hover {
    opacity: 0.8;
  }
`;

const Profile = () => {
  const [profileImg, setprofileImg] = useState('https://ifh.cc/g/rO5WOi.png');
  const [email, setEmail] = useState('test@gmail.com');
  const [password, setPassword] = useState('Test1234?');
  const [passwordMsg, setPasswordMsg] = useState('');
  const [emailMsg, setEmailMsg] = useState('');
  const [confirmPasswordMsg, setConfirmPasswordMsg] = useState('');

  const handleImage = (e) => {
    const validExtensions = ['image/jpeg', 'image/peg', 'image/png'];
    const fileType = e.target.files[0].type;
    if (validExtensions.includes(fileType)) {
      const reader = new FileReader();
      reader.onload = () => {
        setprofileImg(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      alert('이미지 파일만 사용 가능합니다.');
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

  const handleBtn = () => {};

  return (
    <ProfileContainer>
      <MyImage>
        <img src={profileImg} alt="" id="" className="" />
        <input
          type="file"
          name="image-upload"
          id="image-upload"
          onChange={handleImage}
        />
        <label htmlFor="image-upload" className="image-upload">
          이미지 선택
        </label>
      </MyImage>
      <MyInfo passwordMsg={passwordMsg}>
        <li>
          <Title>유저네임</Title>
          <EditInput type="text" value="test" />
        </li>
        <li>
          <Title>이메일</Title>
          <EditInput type="email" defaultValue={email} onChange={handleEmail} />
          {emailMsg ? <ErrorMsg>{emailMsg}</ErrorMsg> : <></>}
        </li>
        <li>
          <Title>비밀번호</Title>
          <EditInput
            type="password"
            defaultValue={password}
            onChange={handlePassword}
          />
          {passwordMsg ? <ErrorMsg>{passwordMsg}</ErrorMsg> : <></>}
        </li>
        <li>
          <Title>비밀번호 재입력</Title>
          <EditInput type="password" onChange={handleConfirmPassword} />
          {confirmPasswordMsg ? (
            <ErrorMsg>{confirmPasswordMsg}</ErrorMsg>
          ) : (
            <></>
          )}
        </li>
      </MyInfo>
      <Button onClick={handleBtn}>변경하기</Button>
    </ProfileContainer>
  );
};

export default Profile;
