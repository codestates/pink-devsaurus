import React from 'react';
import styled from 'styled-components';
import Profile from '../compenents/Profile';

  const Container = styled.div`
    display: flex;
  `

  const Sidebar = styled.div`
    background: yellow;
    width: 20%;
    height: 100vh;
  `


const MyPage = () => {

  return (
    <>
    <Container>
      <Sidebar />
      <Profile />
    </Container>

    </>
  );
};

export default MyPage;