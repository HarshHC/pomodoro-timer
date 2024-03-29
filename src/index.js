import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ChakraProvider, CSSReset, extendTheme } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import * as serviceWorker from './serviceWorker';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: false
};

const theme = extendTheme({ config });

ReactDOM.render(
  <React.StrictMode>
    <CSSReset />
    <ChakraProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
serviceWorker.unregister();
