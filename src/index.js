import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Avalanche, Config, DAppProvider, Mainnet, Ropsten} from '@usedapp/core';

const config = {
  readOnlyChainId: Avalanche.chainId,
  readOnlyUrls: {
    // [Ropsten.chainId]: 'https://nd-612-265-160.p2pify.com/83afdf25f354b80e10aa4a82e8a4b7cb/ext/bc/C/rpc',
    [Avalanche.chainId]: 'https://nd-612-265-160.p2pify.com/83afdf25f354b80e10aa4a82e8a4b7cb/ext/bc/C/rpc',
  },
}

ReactDOM.render(
  <React.StrictMode>
     <DAppProvider config={config}>
      <App />
    </DAppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
