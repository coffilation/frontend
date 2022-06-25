import axios from 'axios'

export const baseURL = process.env.REACT_APP_BACKEND_URL

export const api = axios.create({ baseURL })

// const tokenEndpoint = process.env.REACT_APP_AUTH_TOKEN_ENDPOINT as string

// const createResponseInterceptor = () => {
//   const interceptor = api.interceptors.response.use(
//     undefined,
//     async (error) => {
//       if (
//         error.response.status !== 401 ||
//         error.response.config.url.includes(tokenEndpoint)
//       ) {
//         // Парсинг ошибок django
//         notification.error({
//           message: `Ошибка запроса`,
//           description:
//             JSON.stringify(error.response.data).length < 256 &&
//             Object.entries(error.response.data).map(
//               ([key, value]) =>
//                 `${key.charAt(0).toUpperCase()}${key.slice(1)}: ${
//                   Array.isArray(value) ? value.join(`, `) : value
//                 }`,
//             ),
//         })
//
//         await Promise.reject(error)
//       }
//
//       api.interceptors.response.eject(interceptor)
//
//       try {
//         const { access_token } = await refreshTokens(
//           localStorage.getItem(`refresh`) as string,
//         )
//         error.response.config.headers[
//           `Authorization`
//           ] = `Bearer ${access_token}`
//         return await api(error.response.config)
//       } catch (error) {
//         localStorage.clear()
//         window.location.replace(Path.User)
//         await Promise.reject(error)
//       } finally {
//         createResponseInterceptor()
//       }
//     },
//   )
// }
//
// createResponseInterceptor()
