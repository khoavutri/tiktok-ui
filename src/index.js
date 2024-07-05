import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { store } from './redux/store'
import { Provider } from 'react-redux'
import './GlobalStyle/GlobalStyle.scss';
import i18n from "./i18n"
import { I18nextProvider } from 'react-i18next';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <I18nextProvider i18n={i18n}>
        <Provider store={store}>
            <App />
        </Provider>
        </I18nextProvider>
    </React.StrictMode>,
);


reportWebVitals();
