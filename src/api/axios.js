import axios from 'axios'
//import {createBrowserHistory} from 'history'

const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})


const authInterceptor = config => {
  config.headers.authorization = `Bearer ${localStorage.token}`
  return config
}

$authHost.interceptors.response.use(response => response, error => {
  if (error.response.status === 401) {
    console.log('HERE');
    window.location.href = '/login'
   // createBrowserHistory().push('/login')
  }
})

$authHost.interceptors.request.use(authInterceptor)




export {
  $host, $authHost
}