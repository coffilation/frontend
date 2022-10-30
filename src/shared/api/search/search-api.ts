import axios, { AxiosRequestConfig } from 'axios'

const baseURL = process.env.REACT_APP_SEARCH_URL

export const searchApi = axios.create({ baseURL })

export const searchSWRFetcher = (url: string, config?: AxiosRequestConfig) => {
  return searchApi.get(url, config).then((response) => response.data)
}
