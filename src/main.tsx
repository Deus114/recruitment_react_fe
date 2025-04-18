import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app';
import { Provider } from 'react-redux'
import { store } from '@/redux/store';
import enUS from 'antd/locale/en_US';
import { ConfigProvider } from 'antd';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider locale={enUS}>
      <Provider store={store}>
        <App />
      </Provider>
    </ConfigProvider>
  </React.StrictMode>,
)
