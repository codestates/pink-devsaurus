import React, { useState, useRef, useLayoutEffect } from 'react';
import styled from 'styled-components';
import Profile from '../components/Profile';
import Sidebar from '../components/Sidebar';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${({ headerSize }) => headerSize.header}px;
  margin-left: ${({ headerSize }) => headerSize.sidebar}px;
`;

const MyPage = () => {
  const [sizingInfo, setSizingInfo] = useState({ sidebar: 0 });
  const sidebarRef = useRef();

  useLayoutEffect(() => {
    function updateSize() {
      setSizingInfo({
        sidebar: sidebarRef.current.firstChild.clientWidth,
      });
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => {
      window.removeEventListener('resize', updateSize);
    };
  }, []);
  return (
    <>
      <div ref={sidebarRef}>
        <Sidebar
          list={[{ category_name: '나의 정보' }, { category_name: 'My Q & A' }]}
        />
      </div>
      <Wrapper headerSize={sizingInfo}>
        <Profile />
      </Wrapper>
    </>
  );
};

export default MyPage;
