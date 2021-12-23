import React, { useEffect, useState } from 'react';
import Content from './Content';
import styled from 'styled-components';
import axios from 'axios';

const ContentsWrapper = styled.div`
  width: 100%;
  min-height: 90vh;
  right: 0;
  background-color: var(--white);
  padding: 4% 8% 2% 8%;

  > a:nth-child(10) > div {
    border-bottom: none !important;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 1vmax 0;
`;

const Button = styled.button`
  font-size: 1vmax;
  margin-right: 1vmax;
  padding: 0 0.4vmax;
`;

const Contents = ({ contentList, setPage }) => {
  const [pagenation, setPagenation] = useState([1, 2, 3, 4, 5]);
  const [page, setPage] = useState('1');

  useEffect(() => {
    axios
      .get(
        `https://pinkdevsaurus.tk/questions${
          page !== '1' ? '?page=' + page : ''
        }`
      )
      .then((res) => {
        setContentList(res.data.result);
      });
  }, [page]);

  const selectPage = (e) => {
    setPage(e.target.textContent);
  };

  const selectPage = (e) => {
    setPage(e.target.textContent);
  };

  const goPreviousPage = () => {
    if (pagenation[0] !== 1) {
      setPagenation(pagenation.map((num) => num - 5));
    }
  };

  const goNextPage = () => {
    if (pagenation[4] !== 100) {
      setPagenation(pagenation.map((num) => num + 5));
    }
  };

  return (
    <ContentsWrapper>
      {contentList.map((item, idx) => (
        <Content key={idx} data={item}></Content>
      ))}
      <ButtonWrapper>
        <Button onClick={goPreviousPage}>&lt;</Button>
        {pagenation.map((num, idx) => (
          <Button key={idx} onClick={selectPage}>
            {num}
          </Button>
        ))}
        <Button onClick={goNextPage}>&gt;</Button>
      </ButtonWrapper>
    </ContentsWrapper>
  );
};

export default Contents;
