import axios, { AxiosRequestConfig } from 'axios'
import { notification } from 'antd'
import { postAuthRefresh } from 'entities/auth/lib'
import { backendRoutes } from './backend-routes'

const baseURL = process.env.REACT_APP_BACKEND_URL

export const backendApi = axios.create({ baseURL })

export const backendSWRFetcher = (url: string, config?: AxiosRequestConfig) => {
  return backendApi.get(url, config).then((response) => response.data)
}

const createResponseInterceptor = () => {
  const interceptor = backendApi.interceptors.response.use(
    undefined,
    async (error) => {
      if (
        error.response.status !== 401 ||
        error.response.config.url.includes(backendRoutes.authLogin) ||
        error.response.config.url.includes(backendRoutes.authRefresh)
      ) {
        notification.error({
          message: `Ошибка запроса`,
          description: error.response.data.message,
        })

        await Promise.reject(error)
      }

      backendApi.interceptors.response.eject(interceptor)

      try {
        const { access } = await postAuthRefresh({
          refresh: localStorage.getItem(`refresh`) as string,
        })
        error.response.config.headers[`Authorization`] = `Bearer ${access}`

        return await backendApi(error.response.config)
      } catch (error) {
        localStorage.clear()
        await Promise.reject(error)
      } finally {
        createResponseInterceptor()
      }
    },
  )
}

createResponseInterceptor()
