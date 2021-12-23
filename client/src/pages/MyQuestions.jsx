import React from 'react';
import Contents from '../components/Contents';
import MyStatus from '../components/MyStatus';
import Sidebar from '../components/Sidebar';

const MyQuestions = ({ contentList, setPage }) => {
  return (
    <>
      <Sidebar
        list={[{ category_name: '나의 정보' }, { category_name: 'My Q & A' }]}
      />
      <MyStatus />
      <Contents setPage={setPage} contentList={contentList} />
    </>
  );
};

export default MyQuestions;
