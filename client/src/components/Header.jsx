import React from 'react';
import styled from "styled-components";
import '../App.css';

const Head = styled.header`
  width: 100%;
  position: fixed;
  top: 0;
  display: flex;
  justify-content: space-between;
  background-color: whitesmoke;
  align-items: center;
  border-bottom: 1px solid black;
  padding: 0.2rem;
`;

const Img = styled.img`
  width: 4%;
  min-width: 85px;
  margin-left: 1%;
`;

const Button = styled.div`
  min-width: 140px;
  color: white;
  background-color: var(--pink);
  padding: 0.8rem 1.5rem;
  border-radius: 40px;
  font-size: 1.2rem;
  font-weight: 500;
  text-align: center;
  /* flex: 0.1 0 0; */
  
  :hover {
    /* color: var(--pink); */
    background-color: pink;
    cursor: pointer;
  }
`;

const SearchBar = styled.div`
  display: flex;
  width: 100%;
  height: 3.2rem;
  align-items: center;
  border-radius: 50px;
  border: 1px solid black;
  flex: 0.5 0 0;
  min-width: 240px;

  > span {
    margin-left: 2%;
    margin-right: 2%;
  }
`;

const Input = styled.input`
  flex: 1 0 0;
  height: 70%;
  margin-right: 3%;
  border: none;
  font-size: 1rem;
  background-color: whitesmoke;

  :focus-within {
    outline: transparent;
  }
`;

const WrapperSign = styled.div`
  display: flex;
  margin-right: 1%;
`

const ButtonSignIn = styled(Button)`
  background-color: whitesmoke;
  color: black;
  border: 2px solid transparent;
  font-weight: 400;
  min-width: 80px;
  margin-left: 5px;
`

const ButtonSignUp = styled(Button)`
  background-color: whitesmoke;
  color: black;
  font-weight: 400;
  border-radius: 10px;
  border: 2px solid pink;
  min-width: 80px;
  margin-left: 5px;
`

const Header = (props) => {
  const search = (e) => {
    // Enter 누르면 서치
    console.log('search')
  }

  return (
    <Head>
      <Img src='https://raw.githubusercontent.com/exxocism/exxo-file-share/master/Wireframe/pinkDevelopSaurus.png'/>
      <Button>Q &amp; A' s</Button>
      <Button>My Q &amp; A</Button>
      <SearchBar>
        <span>
          <img src="https://img.icons8.com/ios-glyphs/30/000000/search--v1.png"/>
        </span>
        <Input
          onKeyUp={(e) => e.key === 'Enter' ? search(e) : null}
          placeholder='검색 키워드를 입력하세요.'
        ></Input>
      </SearchBar>
      <Button>질문하기</Button>
      <WrapperSign>
        <ButtonSignIn>로그인</ButtonSignIn>
        <ButtonSignUp>회원가입</ButtonSignUp>
      </WrapperSign>
    </Head>
  );
};

export default Header;