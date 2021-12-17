import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
  --pink: #ED8E76;
  --pure-white: white;
  --white: whitesmoke;
  --black: black;
  --gray: gray;
  }

  body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: var(--pink);
  }
`;

export default GlobalStyle;
