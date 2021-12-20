// 담당자 : 김경봉 (Front-end)
// 2021-12-17 15:10:14

import React from 'react';
import styled from 'styled-components';

const Bar = styled.div`
  display: flex;
  width: 100%;
  height: 4vmax;
  align-items: center;
  border-radius: 50px;
  border: 2px solid gray;
  flex: 0.4 0 0;
  min-width: 20vmax;

  > span {
    margin-left: 3%;
    margin-right: 2%;

    > img {
      width: 2vmax;
    }
  }
`;

const Input = styled.input`
  flex: 1 0 0;
  height: 70%;
  margin-right: 3%;
  border: none;
  font-size: 1vmax;
  background-color: whitesmoke;
  white-space: nowrap;

  :focus-within {
    outline: transparent;
  }
`;

const SearchBar = () => {
  const searchKeyward = (e) => {
    // Enter 누르면 서치
    // 엔드포인트 정하고 axios로 요청
    console.log(e.target.value);
    console.log('search');
  };

  return (
    <Bar>
      <span>
        <img
          src="https://img.icons8.com/ios-glyphs/30/000000/search--v1.png"
          alt="magnifying glass"
        />
      </span>
      <Input
        onKeyUp={(e) => (e.key === 'Enter' ? searchKeyward(e) : null)}
        placeholder="검색 키워드를 입력하세요."
      ></Input>
    </Bar>
  );
};

export default SearchBar;
