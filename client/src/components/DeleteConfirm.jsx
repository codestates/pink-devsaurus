import React from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div``;

const ModalBackdrop = styled.div`
  display: grid;
  place-items: center;
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.192);
`;

const ModalView = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--white);
  border-radius: 50px;
  width: 50vmax;
  height: 30vmax;
`;

const ModalLable = styled.div`
  font-size: 2.5vmax;
  font-weight: bold;
  text-align: center;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;

  > button:first-child {
    background-color: #79f29f;
    padding: 0 3vmax;
  }

  > button:last-child {
    background-color: #f2798d;
  }
`;

const Button = styled.button`
  font-size: 2vmax;
  font-weight: bold;
  text-align: center;
  margin: 5vmax 3vmax 0 3vmax;
  border-radius: 10px;
  border: none;
  background-color: none;
  padding: 1.5vmax;
  cursor: pointer;
`

const DeleteConfirm = ({ handleDelete }) => {
  const handler = (e) => {
    if (e.target.tagName === 'DIV' || e.target.textContent === '아니오') {
      handleDelete(false);
      return;
    }
    handleDelete(true);
  }

  return (
    <ModalWrapper>
      <ModalBackdrop onClick={handler}>
        <ModalView role="dialog" onClick={(e) => e.stopPropagation()}>
          <ModalLable>
            정말로 글을 삭제 하시겠습니까?
          </ModalLable>
          <ButtonWrapper>
            <Button onClick={handler}>예</Button>
            <Button onClick={handler}>아니오</Button>
          </ButtonWrapper>
        </ModalView>
      </ModalBackdrop>
    </ModalWrapper>
  );
};

export default DeleteConfirm;
