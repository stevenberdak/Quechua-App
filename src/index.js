import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './service-worker.js';
import dotenv from 'dotenv';

dotenv.config();
serviceWorker.register();

ReactDOM.render(<App />, document.getElementById('root'));
