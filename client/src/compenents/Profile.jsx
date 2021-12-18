import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 80%;
  height: 100vh;
  background: var(--white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MyImage = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-bottom: 10px;
    border: 1px solid lightgray;
  }

  input[type='file'] {
    display: none;
  }

  label {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 10px;
    font-weight: bold;
    font-size: 13px;
    cursor: pointer;
    margin-bottom: 10px;
  }
  
  label:hover {
    color: hotpink;
    font-weight: bold;
  }
`;

const MyInfo = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 300px;

  li {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
  }
`;

const Title = styled.span`
  margin-bottom: 5px;
  font-weight: bold;
`;

const EditInput = styled.input`
  width: 350px;
  height: 30px;
  outline: none;
  border: 1px solid lightgray;
  height: 35px;
  border-radius: 5px;
  outline: none;
  padding-left: 7px;
`;

const ErrorMsg = styled.span`
  width: 100%;
  color: red;
  font-size: 13px;
  font-weight: bold;
  margin-top: 3px;
`;

const Button = styled.button`
  height: 35px;
  width: 100px;
  border-radius: 5px;
  background-color: var(--pink);
  font-weight: bold;
  border: none;
  cursor: pointer;
  font-size: 15px;
  margin-bottom: 10px;
`;

const Profile = () => {
  const [profileImg, setprofileImg] = useState('https://ifh.cc/g/rO5WOi.png');
  const [email, setEmail] = useState('test@gmail.com');
  const [password, setPassword] = useState('Test1234?');
  const [passwordMsg, setPasswordMsg] = useState('');
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

  const handleEmail = (e) => {
    setEmail(e.target.value);
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
    <Container>
      <MyImage>
        <img src={profileImg} alt='' id='' className='' />
        <input
          type='file'
          name='image-upload'
          id='image-upload'
          onChange={handleImage}
        />
        <label htmlFor='image-upload' className='image-upload'>
          이미지 선택
        </label>
      </MyImage>
      <MyInfo>
        <li>
          <Title>유저네임</Title>
          <EditInput type='text' value='test' />
        </li>
        <li>
          <Title>이메일</Title>
          <EditInput type='email' defaultValue={email} onChange={handleEmail} />
        </li>
        <li>
          <Title>비밀번호</Title>
          <EditInput
            type='password'
            defaultValue={password}
            onChange={handlePassword}
            />
            {passwordMsg ? <ErrorMsg>{passwordMsg}</ErrorMsg> : <></>}
        </li>
        <li>
          <Title>비밀번호 재입력</Title>
          <EditInput type='password' onChange={handleConfirmPassword} />
        {confirmPasswordMsg ? <ErrorMsg>{confirmPasswordMsg}</ErrorMsg> : <></>}
        </li>
      </MyInfo>
      <Button onClick={handleBtn}>변경하기</Button>
    </Container>
  );
};

export default Profile;
