// 담당자 : 최민우 (Front-end)
// 2021-12-17 16:41:26

import { useEffect, useState, useRef } from 'react';
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
  animation-name: rollin;
  animation-duration: 1.2s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;

  @keyframes rollin {
    0% {
      transform: rotate(0deg) scale(1.0);
      
    }
    50% {
      transform: rotate(180deg) scale(0.8);
    }
    100% {
      transform: rotate(360deg) scale(1.0);
    }
  }

`;

const LoadingText = styled.div`
  margin-top: 1rem;
  font-size: 1.5rem;
  font-weight: bold;
  color: whitesmoke;
`;

const dino = require('../assets/pinkDevelopSaurus.png');

const Loading = () => {
  
  const [loadingString, setLoadingString] = useState('.');
  const previousString = useRef();

  const loadHandler = () => {
    if (previousString.current) {
      setLoadingString(previousString.current + '.');
    }
    if (previousString.current === '...') {
      setLoadingString('.');
    }
  };  
  
  useEffect(() => {
    previousString.current = loadingString;
  });

  useEffect(() => {
    const loadingTextTimer = setInterval(loadHandler, 200);
    return () => {
      clearInterval(loadingTextTimer);
    };
  }, []);


  return (
    <LoadingWrapper>
      <LoadingImg src={dino} />
      <LoadingText>{`로딩중${loadingString}`}</LoadingText>
    </LoadingWrapper>
  );
};

export default Loading;
