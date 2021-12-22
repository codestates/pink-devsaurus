// 담당자 : 최민우 (Front-end)
// 2021-12-17 17:11:36

import { useState, useLayoutEffect } from 'react';
import styled from 'styled-components';
import MDEditor from '@uiw/react-md-editor';
import axios from 'axios';

import Loading from './Loading.jsx';
import SimpleOKModal from './SimpleOKModal.jsx';
import { Navigate, useNavigate } from 'react-router-dom';

const NewDiscussionContainer = styled.div`
  padding: 1.2rem;
`;

const NewDicussionName = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: rgba(32, 20, 20, 0.884);
`;

const CategoryAndTitleWrapper = styled.div`
  margin-top: 1.2rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
`;

const CategorySelect = styled.select`
  flex: 1 1 auto;
  font-size: 1.1rem;
  font-weight: bold;
  padding: 0.3rem 0.5rem;
  margin-right: 0.5rem;
  color: rgba(32, 20, 20, 0.747);
  border-radius: 6px;
  border-color: #dfdfe0;
  background-color: whitesmoke;
`;

const Title = styled.input`
  flex: 80 80 auto;
  font-size: 1.1rem;
  font-weight: bold;
  padding: 0.35rem 0.8rem;
  border-radius: 6px;
  color: rgba(32, 20, 20, 0.747);
  background-color: whitesmoke;
  border: 1px solid #dfdfe0;
`;

const StartDiscussionWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const StartDiscussionButton = styled.button`
  margin-top: 1rem;
  margin-right: 0.5rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: bold;
  color: white;
  background-color: #fd97a8;
  border-radius: 6px;
  border: none;
  &:hover {
    background-color: #f9b6c2;
  }
  &:active {
    background-color: #ff6d88;
  }
`;

const Write = ({ isQuestion, handleWriteSuccess }) => {
  const [category, setCategory] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [categoryList, setCategoryList] = useState(null);
  const [writeCanceledDialog, setWriteCanceledDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (isQuestion && !category) {
      setErrorMessage('카테고리를 선택해주세요.');
      setWriteCanceledDialog(true);
      return;
    }
    if (isQuestion && !title) {
      setErrorMessage('질문 이름을 작성해 주세요.');
      setWriteCanceledDialog(true);
      return;
    }
    if (!content) {
      setErrorMessage('게시물 내용을 작성해 주세요.');
      setWriteCanceledDialog(true);
      return;
    }

    if (isQuestion) handleWriteSuccess(category, title, content);
    else handleWriteSuccess(content);
  };

  useLayoutEffect(() => {
    async function fetchData() {
      try {
        await axios.get('https://pinkdevsaurus.tk/auth');
      } catch (err) {
        navigate('/login');
        return;
      }

      let fetchResult;
      try {
        fetchResult = await axios.get(`https://pinkdevsaurus.tk/categories`, {
          withCredentials: true,
        });
      } catch (err) {
        console.dir(err);
        setErrorMessage(
          '카테고리 목록을 불러오지 못했습니다. 관리자에게 문의하세요.'
        );
        setWriteCanceledDialog(true);
        return;
      }

      setCategoryList(fetchResult.data.result);
    }
    fetchData();
  }, []);

  if (isQuestion && !categoryList) return <Loading />;

  return (
    <NewDiscussionContainer>
      {writeCanceledDialog ? (
        <SimpleOKModal
          handleOK={() => setWriteCanceledDialog(false)}
          Message={errorMessage}
        />
      ) : (
        false
      )}
      <NewDicussionName>
        {isQuestion ? '질문' : '답변'} 작성하기
      </NewDicussionName>
      <CategoryAndTitleWrapper>
        {isQuestion ? (
          <>
            <CategorySelect
              value={category}
              id="category"
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            >
              <option value="">카테고리 선택</option>
              {categoryList.map(({ category_name: category }, index) => {
                return (
                  <option
                    key={index}
                    value={category + '|' + (Number(index) + 1)}
                  >
                    {category}
                  </option>
                );
              })}
            </CategorySelect>
            <Title
              placeholder="제목"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />
          </>
        ) : (
          false
        )}
      </CategoryAndTitleWrapper>
      <MDEditor value={content} onChange={setContent}></MDEditor>
      <StartDiscussionWrapper>
        <StartDiscussionButton onClick={handleClick}>
          작성하기
        </StartDiscussionButton>
      </StartDiscussionWrapper>
    </NewDiscussionContainer>
  );
};

export default Write;
