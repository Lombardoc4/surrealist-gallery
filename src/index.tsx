import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import { render } from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";


declare global {
  interface Window {
    artworkTimeout?: any;
  }
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<App />}>
        {/* <Route index element={<Artists />} /> */}
        <Route path=":artist" element={<App />} />
      </Route>
    </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
