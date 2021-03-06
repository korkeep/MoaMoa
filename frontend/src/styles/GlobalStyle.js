import { createGlobalStyle } from 'styled-components'


const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    font-family: Noto Sans KR, Helvetica, Arial, sans-serif;
  }

  a {
    text-decoration: none;
    color: black;
    cursor: pointer;
  }
`

export default GlobalStyle