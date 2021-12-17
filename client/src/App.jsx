// 담당자 : 김경봉 (Front-end)
// 2021-12-17 15:10:14

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    // 담당자 : 김경봉 (Front-end)
    // 2021-12-17 15:10:14
    <BrowserRouter>
      <Header isLogin={isLogin}></Header>
      <Footer></Footer>
    </BrowserRouter>
  );
};

export default App;
