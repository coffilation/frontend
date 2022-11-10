import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { SWRConfig } from 'swr'

import { App } from 'app'
import { backendSWRFetcher } from 'shared/api'
import { ConfigProvider } from 'antd'
import { UserAuthProvider } from 'features/user-auth-context/ui'

const root = ReactDOM.createRoot(document.getElementById(`root`) as HTMLElement)

root.render(
  <SWRConfig value={{ fetcher: backendSWRFetcher }}>
    <ConfigProvider componentSize='large'>
      <BrowserRouter>
        <UserAuthProvider>
          <App />
        </UserAuthProvider>
      </BrowserRouter>
    </ConfigProvider>
  </SWRConfig>,
)
