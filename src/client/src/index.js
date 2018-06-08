import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import MainApp from './containers/MainApp';
import store from './store'
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <MainApp />
        </Provider>
    </BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
