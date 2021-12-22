import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import Contents from './components/Contents';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyPage from './pages/MyPage';
import Read from './pages/Read';
import Write from './components/Write';
import MyQuestions from './pages/MyQuestions';
import './App.css';

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

const OutlineWrapper = styled.div``;

const MainContainer = styled.div``;

const MainScreen = styled.div`
  margin-top: ${({ headerHeight }) => headerHeight.header}px;
  margin-left: ${({ headerHeight }) => headerHeight.sidebar}px;
  background-color: var(--white);
`;

const App = () => {
  const [headerSize, setHeaderSize] = useState({ header: 0, sidebar: 0 });
  const [isLogin, setIsLogin] = useState(false);
  const headerRef = useRef();
  const sidebarRef = useRef();

  useLayoutEffect(() => {
    function updateSize() {
      setHeaderSize({
        header: headerRef.current.firstChild.clientHeight,
        sidebar: sidebarRef.current.firstChild.clientWidth,
      });
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <OutlineWrapper>
      <Routes>
        <Route path='/login' element={false} />
        <Route path='/singup' element={false} />
        <Route
          path='/'
          element={
            <div ref={headerRef}>
              <Header isLogin={isLogin} setIsLogin={setIsLogin} />
            </div>
          }
        />
        <Route
          path='/mypage'
          element={
            <div ref={headerRef}>
              <Header isLogin={isLogin} setIsLogin={setIsLogin} />
            </div>
          }
        />
        <Route
          path='/write'
          element={
            <div ref={headerRef}>
              <Header isLogin={isLogin} setIsLogin={setIsLogin} />
            </div>
          }
        />
        <Route
          path='/myqna'
          element={
            <div ref={headerRef}>
              <Header isLogin={isLogin} setIsLogin={setIsLogin} />
            </div>
          }
        />
        <Route path='/read'>
          <Route
            path=':id'
            element={
              <div ref={headerRef}>
                <Header isLogin={isLogin} setIsLogin={setIsLogin} />
              </div>
            }
          />
        </Route>
      </Routes>

      <MainContainer>
        <Routes>
          <Route
            exact
            path='/'
            element={
              <div ref={sidebarRef}>
                <Sidebar list={categories.result}></Sidebar>
              </div>
            }
          />
          <Route path='/read'>
            <Route
              path=':id'
              element={
                <div ref={sidebarRef}>
                  <Sidebar list={categories.result}></Sidebar>
                </div>
              }
            />
          </Route>
          {/* localhost:3000/read/30 */}
        </Routes>

        <Routes>
          <Route
            exact
            path='/'
            element={
              <MainScreen headerHeight={headerSize}>
                <Contents />
              </MainScreen>
            }
          />
          <Route
            path='/mypage'
            element={
              <MainScreen headerHeight={headerSize}>
                <MyPage />
              </MainScreen>
            }
          />
          <Route
            path='/myqna'
            element={
              <MainScreen headerHeight={headerSize}>
                <MyQuestions />
              </MainScreen>
            }
          />
          <Route path='/read'>
            <Route
              path=':id'
              element={
                <MainScreen headerHeight={headerSize}>
                  <Read />
                </MainScreen>
              }
            />
          </Route>
          <Route
            path='/write'
            element={
              <MainScreen
                headerHeight={{ header: headerSize.header, sidebar: 0 }}
              >
                <Write />
              </MainScreen>
            }
          />
          <Route
            path='/login'
            element={
              <MainScreen headerHeight={{ header: 0, sidebar: 0 }}>
                <Login setIsLogin={setIsLogin} />
              </MainScreen>
            }
          />
          <Route
            path='/signup'
            element={
              <MainScreen headerHeight={{ header: 0, sidebar: 0 }}>
                <Signup />
              </MainScreen>
            }
          />
        </Routes>
        <Footer />
      </MainContainer>
    </OutlineWrapper>
  );
};

export default App;
