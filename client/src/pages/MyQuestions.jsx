import React, { useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import Contents from '../components/Contents';
import MyStatus from '../components/MyStatus';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import Loading from '../components/Loading';

const MyQuestions = () => {
  const [userInfo, setUserInfo] = useState();

  useLayoutEffect(() => {
    async function calculateCheckedAnswerRate() {
      let tokenInfo;
      try {
        tokenInfo = await axios.get(`https://pinkdevsaurus.tk/auth`, {
          withCredentials: true,
        });
      } catch (error) {
        console.log('error occuered while querying auth');
        console.log(error);
        return;
      }

      let userQuery;
      try {
        userQuery = await axios.get('https://pinkdevsaurus.tk/userinfo', {
          withCredentials: true,
        });
      } catch (error) {
        console.log('error occuered while getting userinfo');
        console.log(error);
        return;
      }

      let numOfCheckedAnswers = 0;
      let pageNumber = 0;

      while (true) {
        //console.log(`pageNumber: ${pageNumber}`);
        let questionsInfo;
        try {
          questionsInfo = await axios.get(
            `https://pinkdevsaurus.tk/questions?page=${pageNumber++}&userid=${
              tokenInfo.data.result.user_id
            }&type=answer`,
            { withCredentials: true }
          );
        } catch (error) {
          console.log('error occuered while getting questions information');
          console.log(error);
          return;
        }

        if (questionsInfo.data.result.length === 0) break;

        questionsInfo.data.result.forEach((question) => {
          if (question.answered_user_id === tokenInfo.data.result.user_id)
            numOfCheckedAnswers++;
        });
      }

      const answeredRate = Math.round(
        (numOfCheckedAnswers / userQuery.data.result.answer) * 100
      );
      const payload = Object.assign({}, userQuery.data.result, {
        numOfCheckedAnswers,
        answeredRate,
      });

      //답변의 갯수
      //console.log(`총 답변갯수 = ${userQuery.data.result.answer}`);
      //답변중 채택된 갯수
      //console.log(`채택된 갯수 = ${numOfCheckedAnswers}`);

      //채택된 답변의 갯수 / 답변의 갯수
      //console.log(`답변율 = ${answeredRate}%`);

      setUserInfo(payload);
    }
    calculateCheckedAnswerRate();
  }, []);

  if( !userInfo ) return <Loading />;

  return (
    <>
      <Sidebar
        list={[{ category_name: '나의 정보' }, { category_name: 'My Q & A' }]}
      />
      <MyStatus userInfo={userInfo} />
      <Contents />
    </>
  );
};

export default MyQuestions;
