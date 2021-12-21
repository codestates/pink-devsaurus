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
  border-radius: 30px;
  width: 40vmax;
  height: 20vmax;
`;

const ModalLable = styled.div`
  font-size: 2vmax;
  font-weight: bold;
  text-align: center;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  font-size: 1.5vmax;
  font-weight: bold;
  text-align: center;
  margin: 5vmax 3vmax 0 3vmax;
  border-radius: 10px;
  border: none;
  background-color: none;
  padding: 1.5vmax;
  background-color: var(--pink);
  cursor: pointer;
`

const SimpleOKModal = ({ handleOK, Message }) => {

  return (
    <ModalWrapper>
      <ModalBackdrop onClick={handleOK}>
        <ModalView role="dialog" onClick={(e) => e.stopPropagation()}>
          <ModalLable>{Message}</ModalLable>
          <ButtonWrapper>
            <Button onClick={handleOK}>확인</Button>
          </ButtonWrapper>
        </ModalView>
      </ModalBackdrop>
    </ModalWrapper>
  );
};

export default SimpleOKModal;
