// 담당자 : 최민우 (Front-end)
// 2021-12-17 16:41:26

import { useState } from 'react';
import styled from 'styled-components';

const LoadingWrapper = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.7);
  justify-content: center;
  align-items: center;
`;

const LoadingImg = styled.img`

`;

const LoadingText = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: whitesmoke;
`;

const Loading = () => {

  const [loadingString, setLoadingString] = useState('로딩중...');

  const loadHandler = () => {
    console.log('called');
    switch (loadingString) {
      case '로딩중...':
        setLoadingString('로딩중.');
        break;
      case '로딩중.':
        setLoadingString('로딩중..');
        break;
      case '로딩중..': 
        setLoadingString('로딩중...');
        break;
      default:
    }
    //setTimeout(loadHandler, 500);
  };

  return (
    <LoadingWrapper>
      <LoadingImg src={require('../assets/pinkDevelopSaurus.png')} />
      <LoadingText onLoad={() => { console.log('shit'); loadHandler() }}>{loadingString}</LoadingText>
    </LoadingWrapper>
  );
};

export default Loading;

