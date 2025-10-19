import { authHeader } from '../_helpers'
import axios from 'axios'
export const userService = {
  login,
  logout,
  getAll
}

function login (username, password) {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  }

  var payload = {
    username, password
  }
  return axios
    .post('/api/users/login', payload)
    .then(function (response) {
      // login successful if there's a jwt token in the response
      if (response.data.token) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(response))
        localStorage.setItem('organizationId', JSON.stringify(response.data.organizationId))

        localStorage.setItem('actualOrgId', JSON.stringify(response.data.orgId))
        localStorage.setItem('organizationEmail', JSON.stringify(response.data.id))
        localStorage.setItem('userId', JSON.stringify(response.data.customerId))
        localStorage.setItem('referenceId', JSON.stringify(response.data.referenceId))
        localStorage.setItem('isTutor', JSON.stringify(response.data.isTutor))

        localStorage.setItem('isFirstLogin', JSON.stringify(response.data.isFirstLogin))

        localStorage.setItem('applicationId', JSON.stringify(response.data.applicationId))
        localStorage.setItem('locationId', JSON.stringify(response.data.locationId))

        localStorage.setItem('name', JSON.stringify(response.data.name))
        localStorage.setItem('email', JSON.stringify(response.data.id))
        // localStorage.setItem('createdat', JSON.stringify(response.data.createdat));

        axios.interceptors.request.use(function (config) {
          config.headers.Authorization = 'Bearer ' + response.data.token
          return config
        })
      }
      return response.data
    })
}

function logout () {
  // remove user from local storage to log user out
  localStorage.removeItem('user')
}

function getAll () {
  const requestOptions = {
    method: 'GET',
    headers: authHeader()
  }

  return fetch(`api/users`, requestOptions).then(handleResponse)
}

function handleResponse (response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text)
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout()
        location.reload(true)
      }

      const error = (data && data.message) || response.statusText
      return Promise.reject(error)
    }

    return data
  })
}
