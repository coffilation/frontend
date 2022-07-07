import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { SWRConfig } from 'swr'
import { AxiosRequestConfig } from 'axios'

import { App } from 'app'
import { api } from 'shared/api'
import { ConfigProvider } from 'antd'
import { AuthProvider } from 'processes/auth/ui/auth-provider'

const root = ReactDOM.createRoot(document.getElementById(`root`) as HTMLElement)
root.render(
  <SWRConfig
    value={{
      fetcher: (url: string, config?: AxiosRequestConfig) =>
        api.get(url, config).then((response) => response.data),
    }}
  >
    <ConfigProvider componentSize='large'>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </ConfigProvider>
  </SWRConfig>
)
