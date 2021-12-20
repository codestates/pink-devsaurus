import React from 'react';
import Contents from '../components/Contents.jsx';
import Sidebar from '../components/Sidebar.jsx';
import styled from 'styled-components';
import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

const MainWrapper = styled.div`
  background-color: var(--white);
`;

const BodyWrapper = styled.div`
  max-width: 1900px;
  display: flex;
  padding-top: 6vmax;
  background-color: var(--white);
`;

const categories = {
  result: [
    {
      category_name: 'View all',
      category_image:
        'https://github.githubassets.com/images/icons/emoji/unicode/1f4f1.png',
    },
    {
      category_name: 'Database',
      category_image:
        'https://github.githubassets.com/images/icons/emoji/unicode/1f4f1.png',
    },
    {
      category_name: 'JavaScript',
      category_image:
        'https://github.githubassets.com/images/icons/emoji/unicode/1f4f1.png',
    },
  ],
};

const Main = () => {
  return (
    <MainWrapper>
      <Header></Header>
      <BodyWrapper>
        <Sidebar list={categories.result}></Sidebar>
        <Contents></Contents>
      </BodyWrapper>
      <Footer></Footer>
    </MainWrapper>
  );
};

export default Main;
