import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//import 'antd/dist/antd.css' 

//读取local中保存user, 保存到内存中
import storageUtils from './utils/storageUtils'
import memoryUitls from './utils/memoryUitls'
const user = storageUtils.getUser()
memoryUitls.user = user


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
