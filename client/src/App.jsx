import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Routes, Route, useNavigate } from 'react-router-dom';
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
import SimpleOKModal from './components/SimpleOKModal';
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
  const [writeCanceledDialog, setWriteCanceledDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [contentList, setContentList] = useState([]);
  const [username, setUsername] = useState('');
  const [page, setPage] = useState('1');
  const headerRef = useRef();
  const sidebarRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        `https://pinkdevsaurus.tk/questions?page=${
          page + (selectedCategory ? '&category=' + (selectedCategory + 1) : '')
        }
        `
      )
      .then((res) => {
        setContentList(res.data.result);
      })
      .catch((err) => {
        console.dir(err);
        setErrorMessage(
          '글 목록을 불러오지 못했습니다. 관리자에게 문의하세요.'
        );
        setWriteCanceledDialog(true);
      });
  }, [selectedCategory, page]);

  useEffect(() => {
    axios
      .get('https://pinkdevsaurus.tk/categories')
      .then((res) => {
        setCategories(res.data.result);
      })
      .catch((err) => {
        console.dir(err);
        setErrorMessage(
          '카테고리 목록을 불러오지 못했습니다. 관리자에게 문의하세요.'
        );
        setWriteCanceledDialog(true);
      });
  }, []);

  useEffect(() => {
    axios
      .get('https://pinkdevsaurus.tk/auth', {
        withCredentials: true,
      })
      .then((res) => {
        setUsername(res.data.result.username);
        setIsLogin(true);
      })
      .catch((err) => {
        return;
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

  const writeNewArticle = async (category, title, content) => {
    const categoryInfo = category.split('|');

    const payload = {
      category_id: categoryInfo[1],
      title,
      content,
    };

    let writeResult;
    try {
      writeResult = await axios.post(
        `https://pinkdevsaurus.tk/questions`,
        payload,
        { withCredentials: true }
      );
    } catch (err) {
      console.log(err);
      setErrorMessage('게시물 작성에 실패했습니다. 관리자에게 문의해 주세요.');
      setWriteCanceledDialog(true);
      return;
    }

    let queryResult;
    try {
      queryResult = await axios.get(
        `https://pinkdevsaurus.tk/questions?page=1`,
        { withCredentials: true }
      );
    } catch (err) {
      console.log(err);
      setErrorMessage(
        '게시물로 이동하는 데 오류가 발생했습니다. 관리자에게 문의해 주세요.'
      );
      setWriteCanceledDialog(true);
      return;
    }

    navigate(`/read/${queryResult.data.result[0].BOARD_ID}`);
  };

  return (
    <>
      <OutlineWrapper headerHeight={headerSize} />
      <MainContainer headerHeight={headerSize} />
      {writeCanceledDialog ? (
        <SimpleOKModal
          handleOK={() => setWriteCanceledDialog(false)}
          Message={errorMessage}
        />
      ) : (
        false
      )}
      <Routes>
        <Route path="/login" element={false} />
        <Route path="/singup" element={false} />
        <Route
          path="/"
          element={
            <div ref={headerRef}>
              <Header
                username={username}
                isLogin={isLogin}
                setIsLogin={setIsLogin}
              />
            </div>
          }
        />
        <Route
          path="/mypage"
          element={
            <div ref={headerRef}>
              <Header
                username={username}
                isLogin={isLogin}
                setIsLogin={setIsLogin}
              />
            </div>
          }
        />
        <Route
          path="/write"
          element={
            <div ref={headerRef}>
              <Header
                username={username}
                isLogin={isLogin}
                setIsLogin={setIsLogin}
              />
            </div>
          }
        />
        <Route
          path="/myqna"
          element={
            <div ref={headerRef}>
              <Header
                username={username}
                isLogin={isLogin}
                setIsLogin={setIsLogin}
              />
            </div>
          }
        />
        <Route path="/read">
          <Route
            path=":id"
            element={
              <div ref={headerRef}>
                <Header
                  username={username}
                  isLogin={isLogin}
                  setIsLogin={setIsLogin}
                />
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
              <Sidebar
                list={categories}
                setSelectedCategory={setSelectedCategory}
              />
            </div>
          }
        />
        <Route path="/read">
          <Route
            path=":id"
            element={
              <div ref={sidebarRef}>
                <Sidebar
                  list={categories}
                  setSelectedCategory={setSelectedCategory}
                />
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
            <>
              <MainScreen headerHeight={headerSize}>
                <Contents
                  setPage={setPage}
                  contentList={contentList}
                  selectedCategory={selectedCategory}
                />
              </MainScreen>
              <Footer />
            </>
          }
        />
        <Route
          path="/mypage"
          element={
            <>
              <MainScreen headerHeight={headerSize}>
                <MyPage />
              </MainScreen>
              <Footer />
            </>
          }
        />
        <Route
          path="/myqna"
          element={
            <>
              <MainScreen headerHeight={headerSize}>
                <MyQuestions setPage={setPage} contentList={contentList} />
              </MainScreen>
              <Footer />
            </>
          }
        />
        <Route path="/read">
          <Route
            path=":id"
            element={
              <>
                <MainScreen headerHeight={headerSize}>
                  <Read />
                </MainScreen>
                <Footer />
              </>
            }
          />
        </Route>
        <Route
          path="/write"
          element={
            <>
              <MainScreen
                headerHeight={{
                  header: headerSize.header,
                  sidebar: 0,
                  position: headerSize.position,
                  left: headerSize.left,
                }}
              >
                <Write isQuestion={true} handleWriteSuccess={writeNewArticle} />
              </MainScreen>
              <Footer />
            </>
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
    </>
  );
};

export default App;
