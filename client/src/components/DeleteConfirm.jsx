import React from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  position: relative;
  margin-top: 6vmax;
  width: 100%;
  height: 100%;
`;

const ModalBackdrop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.192);
`;

const ModalView = styled.div`
  background-color: var(--white);
`;

const DeleteConfirm = ({ result }) => {
  return (
    <>
      {isOpen ? (
        <ModalWrapper>
          <ModalBackdrop onClick={result}>
            <ModalView>
              <ButtonWrapper>
                <button onClick={''}>예</button>
                <button onClick={result}>아니오</button>
              </ButtonWrapper>
            </ModalView>
          </ModalBackdrop>
        </ModalWrapper>
      ) : null}
    </>
  );
};

export default DeleteConfirm;
