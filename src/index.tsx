import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { SWRConfig } from 'swr'
import { AxiosRequestConfig } from 'axios'

import { App } from 'app'
import { api } from 'shared/api'

const root = ReactDOM.createRoot(document.getElementById(`root`) as HTMLElement)
root.render(
  <SWRConfig
    value={{
      fetcher: (url: string, config?: AxiosRequestConfig) =>
        api.get(url, config).then((response) => response.data),
    }}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SWRConfig>
)
