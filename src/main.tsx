import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from '@/redux/store';
import enUS from 'antd/locale/en_US';
import { App, ConfigProvider } from 'antd';
import Router from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App>
      <ConfigProvider locale={enUS}>
        <Provider store={store}>
          <Router />
        </Provider>
      </ConfigProvider>
    </App>
  </React.StrictMode>,
)
