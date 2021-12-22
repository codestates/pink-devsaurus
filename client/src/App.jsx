import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import Contents from './components/Contents';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import MyPage from './pages/MyPage';
import Read from './pages/Read';
import Write from './components/Write';
import MyQuestions from './pages/MyQuestions';
import './App.css';

const OutlineWrapper = styled.div`
  position: fixed;
  background-color: #f1d2d3;
  width: 100vw;
  top: 0;
  height: ${({ headerHeight }) => headerHeight.position}px;
`;

const MainContainer = styled.div`
  background-color: red;
  height: 2.4vmax;
  /* height: ${(props) =>
    props.headerHeight.position - props.headerHeight.header}px; */
`;

const MainScreen = styled.div`
  margin-top: ${({ headerHeight }) => headerHeight.header}px;
  margin-left: ${({ headerHeight }) =>
    headerHeight.sidebar + headerHeight.left}px;
  margin-right: ${({ headerHeight }) => headerHeight.left}px;
  background-color: var(--white);
`;

const App = () => {
  const [headerSize, setHeaderSize] = useState({
    header: 0,
    sidebar: 0,
    position: 0,
    left: 0,
  });
  const [isLogin, setIsLogin] = useState(false);
  const [categories, setCategories] = useState([]);
  const headerRef = useRef();
  const sidebarRef = useRef();

  useEffect(() => {
    axios.get('https://pinkdevsaurus.tk/categories').then((res) => {
      setCategories(res.data.result);
    });
  }, []);

  useLayoutEffect(() => {
    function updateSize() {
      setHeaderSize({
        header: headerRef.current.firstChild.clientHeight,
        sidebar: sidebarRef.current.firstChild.clientWidth,
        position:
          headerRef.current.firstChild.offsetTop +
          headerRef.current.firstChild.clientHeight,
        left: sidebarRef.current.firstChild.offsetLeft,
      });
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  return (
    <>
      <OutlineWrapper headerHeight={headerSize} />
      <MainContainer headerHeight={headerSize} />
      <Routes>
        <Route path="/login" element={false} />
        <Route path="/singup" element={false} />
        <Route
          path="/"
          element={
            <div ref={headerRef}>
              <Header isLogin={isLogin} setIsLogin={setIsLogin} />
            </div>
          }
        />
        <Route
          path="/mypage"
          element={
            <div ref={headerRef}>
              <Header isLogin={isLogin} setIsLogin={setIsLogin} />
            </div>
          }
        />
        <Route
          path="/write"
          element={
            <div ref={headerRef}>
              <Header isLogin={isLogin} setIsLogin={setIsLogin} />
            </div>
          }
        />
        <Route
          path="/myqna"
          element={
            <div ref={headerRef}>
              <Header isLogin={isLogin} setIsLogin={setIsLogin} />
            </div>
          }
        />
        <Route path="/read">
          <Route
            path=":id"
            element={
              <div ref={headerRef}>
                <Header isLogin={isLogin} setIsLogin={setIsLogin} />
              </div>
            }
          />
        </Route>
      </Routes>

      <Routes>
        <Route
          exact
          path="/"
          element={
            <div ref={sidebarRef}>
              <Sidebar list={categories}></Sidebar>
            </div>
          }
        />
        <Route path="/read">
          <Route
            path=":id"
            element={
              <div ref={sidebarRef}>
                <Sidebar list={categories}></Sidebar>
              </div>
            }
          />
        </Route>
      </Routes>

      <Routes>
        <Route
          exact
          path="/"
          element={
            <MainScreen headerHeight={headerSize}>
              <Contents />
            </MainScreen>
          }
        />
        <Route
          path="/mypage"
          element={
            <MainScreen headerHeight={headerSize}>
              <MyPage />
            </MainScreen>
          }
        />
        <Route
          path="/myqna"
          element={
            <MainScreen headerHeight={headerSize}>
              <MyQuestions />
            </MainScreen>
          }
        />
        <Route path="/read">
          <Route
            path=":id"
            element={
              <MainScreen headerHeight={headerSize}>
                <Read />
              </MainScreen>
            }
          />
        </Route>
        <Route
          path="/write"
          element={
            <MainScreen
              headerHeight={{
                header: headerSize.header,
                sidebar: 0,
                position: headerSize.position,
                left: headerSize.left,
              }}
            >
              <Write isQuestion={true} />
            </MainScreen>
          }
        />
        <Route
          path="/login"
          element={
            <MainScreen headerHeight={{ header: 0, sidebar: 0 }}>
              <Login setIsLogin={setIsLogin} />
            </MainScreen>
          }
        />
        <Route
          path="/signup"
          element={
            <MainScreen headerHeight={{ header: 0, sidebar: 0 }}>
              <SignUp />
            </MainScreen>
          }
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
