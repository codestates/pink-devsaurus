// 담당자 : 김경봉 (Front-end)
// 2021-12-17 15:10:14

import React from 'react';
import styled from 'styled-components';

const Foot = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
`;

const Footer = () => {
  return <Foot>ⓒ 2021 Bug Life</Foot>;
};

export default Footer;
