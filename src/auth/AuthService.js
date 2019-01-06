import auth0 from 'auth0-js'
import decode from 'jwt-decode';
import { AUTH_CONFIG } from './auth0-variables'
import EventEmitter from 'eventemitter3'
import router from './../router'

export default class AuthService {
   authenticated = this.isAuthenticated()
   authNotifier = new EventEmitter()
  constructor () {
    this.login = this.login.bind(this)
    this.setSession = this.setSession.bind(this)
    this.logout = this.logout.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
  }

  auth0 = new auth0.WebAuth({
   domain: AUTH_CONFIG.domain,
   clientID: AUTH_CONFIG.clientId,
   redirectUri: AUTH_CONFIG.callbackUrl,
   audience: `https://${AUTH_CONFIG.domain}/userinfo`,
   responseType: 'token id_token',
   scope: 'openid'
  })

  login () {
    this.auth0.authorize()
  }
  handleAuthentication () {
   this.auth0.parseHash((err, authResult) => {
     if (authResult && authResult.accessToken && authResult.idToken) {
       this.setSession(authResult)
       router.replace('home')
     } else if (err) {
       router.replace('home')
       console.log(err)
       alert(`Error: ${err.error}. Check the console for further details.`)
     }
   })
 }

 setSession (authResult) {
   // Set the time that the access token will expire at
   let expiresAt = JSON.stringify(
     authResult.expiresIn * 1000 + new Date().getTime()
   )
   localStorage.setItem('access_token', authResult.accessToken)
   localStorage.setItem('id_token', authResult.idToken)
   localStorage.setItem('expires_at', expiresAt)
   this.authNotifier.emit('authChange', { authenticated: true })
 }

 logout () {
   // Clear access token and ID token from local storage
   localStorage.removeItem('access_token')
   localStorage.removeItem('id_token')
   localStorage.removeItem('expires_at')
   this.userProfile = null
   this.authNotifier.emit('authChange', false)
   // navigate to the home route
   router.replace('home')
 }

 isAuthenticated () {
   // Check whether the current time is past the
   // access token's expiry time
   let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
   return new Date().getTime() < expiresAt
 }

}
export function getIdToken() {
  return localStorage.getItem(AUTH_CONFIG.ID_TOKEN_KEY);
}

export function getAccessToken() {
  return localStorage.getItem(AUTH_CONFIG.ACCESS_TOKEN_KEY);
}

function clearIdToken() {
  localStorage.removeItem(AUTH_CONFIG.ID_TOKEN_KEY);
}

function clearAccessToken() {
  localStorage.removeItem(AUTH_CONFIG.ACCESS_TOKEN_KEY);
}

// Helper function that will allow us to extract the access_token and id_token
function getParameterByName(name) {
  let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
  console.log("match: ", match)
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

// Get and store access_token in local storage
export function setAccessToken() {
  let accessToken = getParameterByName('access_token');
  localStorage.setItem(AUTH_CONFIG.ACCESS_TOKEN_KEY, accessToken);
}

// Get and store id_token in local storage
export function setIdToken() {
  let idToken = getParameterByName('id_token');
  localStorage.setItem(AUTH_CONFIG.ID_TOKEN_KEY, idToken);
}

export function isLoggedIn() {
  const idToken = getIdToken();
  return !!idToken && !isTokenExpired(idToken);
}

function getTokenExpirationDate(encodedToken) {
  const token = decode(encodedToken);
  if (!token.exp) { return null; }

  const date = new Date(0);
  date.setUTCSeconds(token.exp);

  return date;
}

function isTokenExpired(token) {
  const expirationDate = getTokenExpirationDate(token);
  return expirationDate < new Date();
}
