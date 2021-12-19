import React from 'react';
import Contents from '../components/Contents.jsx';
import Sidebar from '../components/Sidebar.jsx';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
`

const categories = {
  result: [
    {
      category_name: 'View all',
      category_image: 'https://github.githubassets.com/images/icons/emoji/unicode/1f4f1.png'
    },
    {
      category_name: 'Database',
      category_image: 'https://github.githubassets.com/images/icons/emoji/unicode/1f4f1.png'
    },
    {
      category_name: 'JavaScript',
      category_image: 'https://github.githubassets.com/images/icons/emoji/unicode/1f4f1.png'
    },
  ]
}

// 헤더, 사이드바, 푸터 추가
const Main = () => {
  return (
    <Wrapper>
      <Sidebar list={categories.result} ></Sidebar>
      <Contents></Contents>
    </Wrapper>
  )
}

export default Main;
