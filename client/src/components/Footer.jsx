import React from 'react';
import styled from 'styled-components';
import '../App.css';

const Foot = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
`

const Footer = () => {
  return <Foot>ⓒ 2021 Bug Life</Foot>
};

export default Footer;