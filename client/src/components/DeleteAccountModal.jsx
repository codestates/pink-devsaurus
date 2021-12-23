import React, { useState } from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  position: fixed !important;
  top: 0 !important;
  left: 0 !important;
  width: 100vw !important;
  height: 100vh !important;
  z-index: 10000 !important;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
`;

const ModalContainer = styled.div`
  position: relative;
  width: 530px;
  height: 330px;
  background-color: var(--pure-white);
  border-radius: 10px;
  padding: 50px 50px;
`;

const Title = styled.p`
  font-size: 20px;
  text-align: center;
  font-weight: bold;
  margin-bottom: 30px;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    font-size: 15px;
  }

  input {
    height: 35px;
    width: 80%;
    border-radius: 5px;
    outline: none;
    border: 1px solid lightgray;
    padding-left: 7px;
    margin-bottom: 30px;
  }
`;

const ErrorMsg = styled.div`
  color: red;
  width: 80%;
  font-size: 15px;
  font-weight: bold;
  margin-top: -30px;
  margin-bottom: 30px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 45px;

  button {
    height: 35px;
    width: 100px;
    border-radius: 5px;
    color: var(--pure-white);
    background-color: var(--pink);
    font-weight: 500;
    border: none;
    cursor: pointer;
    font-size: 16px;
    margin-bottom: 10px;
  }

  button:hover {
    opacity: 0.8;
  }
`;

const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 30px;
  cursor: pointer;
`;

const DeleteAccountModal = ({ modalHandler }) => {
  const [errorMsg, setErrorMsg] = useState('');

  return (
    <ModalWrapper>
      <ModalContainer>
        <Title>계정을 삭제하시면 다시는 복구할 수 없습니다.</Title>
        <Form>
          <input type='text' placeholder='유저네임' />
          <input type='password' placeholder='비밀번호' />
          {errorMsg ? <ErrorMsg>{errorMsg}</ErrorMsg> : <></>}
        </Form>
        <ButtonWrapper>
          <button>계정 삭제</button>
          <Close onClick={() => modalHandler()}>&times;</Close>
        </ButtonWrapper>
      </ModalContainer>
    </ModalWrapper>
  );
};

export default DeleteAccountModal;
