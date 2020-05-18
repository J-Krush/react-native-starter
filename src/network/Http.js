import axios from 'axios';
import Config from 'react-native-config';
import qs from 'qs';
import firebase from 'react-native-firebase';
import moment from 'moment';
import jwtDecode from 'jwt-decode';
import {NavigationActions} from 'react-navigation';
import {CONSTANTS} from '../config/Constants';
// import {generateMock} from '../../__test_fixtures__/apiFixture';
// import TokenDatabase from '../../Database/TokenDatabase';
import {LOGIN_ROUTE_KEY} from '../navigators/routeKeys';
// import Logger from '../helpers/Logger';
// import {isMockUser, isSandboxUser} from './Users';
// import UserDatabase from '../../Database/UserDatabase';

export default class Http {
  static get idpUrl() {
    return Http._idpUrl;
  }

  static get secret() {
    return Http._isSandbox
      ? Config.OAUTH_CLIENT_SECRET_SANDBOX
      : Config.OAUTH_CLIENT_SECRET_PRODUCTION;
  }

  static logOut() {
    Http._tokenInfo = null;
    Http._apiUrl = null;
    Http._idpUrl = null;
    Http._mock = null;
    Http._isRefreshingToken = false;
    Http._isSandbox = false;

    Http._client = axios.create({
      headers: {'Content-Type': 'application/json'},
    });
  }

  static _setupCrashlytics(isMockEnabled, isSandbox) {
    if (!__DEV__) {
      firebase.crashlytics().setBoolValue(CONSTANTS.LOGS.MOCK, isMockEnabled);
      firebase.crashlytics().setBoolValue(CONSTANTS.LOGS.IS_SANDBOX, isSandbox);
    }
  }

  static _setupUrls(isSandbox) {
    if (isSandbox) {
      Http._isSandbox = true;
      Http._apiUrl = Config.NETWORK_API_URL_SANDBOX;
      Http._idpUrl = Config.NETWORK_IDP_URL_SANDBOX;
    } else {
      Http._isSandbox = false;
      Http._apiUrl = Config.NETWORK_API_URL_PRODUCTION;
      Http._idpUrl = Config.NETWORK_IDP_URL_PRODUCTION;
    }
  }

  static _setupIsMockEnabled(isMockEnabled, isSandbox) {
    if (isMockEnabled) {
      // mutates the client to be a mocked set of endpoints
      // Http._mock = generateMock(Http._client);
    }
    Http._setupCrashlytics(isMockEnabled, isSandbox);
  }

  /* Setting the Base Url in Axios does not allow you to override or change
   it for IdP fetches (which we need to do). Instead of a parse url, we know
   check if we're passing in something like http://identity.com/api/token
   or /mobile/user and append the Api Url if needed.
  */
  static _route(route) {
    if (route.toLowerCase().startsWith('http')) {
      return route;
    }
    return Http._apiUrl + route;
  }

  // InitClient fetches an API identity token for the user,
  //  then sets this on the client to be used in subsequent requests
  static async InitClient(username, password) {
    if (!Http._isInitiated) {
      // check if the username is the env config value to trigger mocked API
      // const isMockEnabled = isMockUser(username);
      // const isSandbox = isSandboxUser(username);
      // Http._setupUrls(isSandbox);
      // Http._setupIsMockEnabled(isMockEnabled, isSandbox);

      // Documentation on formatting the form data:
      //  https://github.com/axios/axios#using-applicationx-www-form-urlencoded-format
      const form = qs.stringify({
        username,
        password,
        grant_type: 'password',
        client_id: Config.OAUTH_CLIENT_ID,
        client_secret: Http.secret,
      });

      // call to get user token
      const tokenResponse = await Http._client
        .post(`${Http.idpUrl}/connect/token`, form, {
          headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        })
        .catch(e => {
          Http._logNetworkError('POST', '/connect/token', {}, e);
          throw e;
        });

      // Logger.logMetaData({
      //   httpTokenResponse: tokenResponse,
      // });

      Http._handleTokenResponse(tokenResponse);
    }

    return Http._tokenInfo;
  }

  static set reduxStore(store) {
    Http._reduxStore = store;
  }

  static set navigator(navigator) {
    Http._navigator = navigator;
  }

  static get _isInitiated() {
    return Http._client && Http._tokenInfo;
  }

  static _handleTokenResponse(response) {
    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      token_type: tokenType,
    } = response.data;
    // set tokens in client header
    Http._client.defaults.headers.common.Authorization = `${tokenType} ${accessToken}`;

    // Seconds since Epoch: https://momentjs.com/docs/#/parsing/unix-timestamp/
    const accessTokenExpiration = moment
      .unix(jwtDecode(accessToken).exp)
      .toISOString();

    const token = {
      accessToken,
      accessTokenExpiration,
      refreshToken,
      tokenType,
    };
    Http._tokenInfo = token;
    return token;
  }

  static _refreshToken(refToken, resolve, reject) {
    Http._isRefreshingToken = true;

    // Documentation on formatting the form data:
    //  https://github.com/axios/axios#using-applicationx-www-form-urlencoded-format
    const form = qs.stringify({
      grant_type: 'refresh_token',
      client_id: Config.OAUTH_CLIENT_ID,
      client_secret: Http.secret,
      refresh_token: refToken,
    });

    // Logger.logMetaData({
    //   fetchingNewRefreshToken: form,
    // });

    Http._client
      .post(`${Http.idpUrl}/connect/token`, form, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      })
      .then(response => {
        // Logger.logMetaData({
        //   fetchedNewToken: response,
        // });
        Http._handleTokenResponse(response);
        return resolve();
      })
      .catch(e => {
        Http._logNetworkError('POST', '/connect/token', {}, e);
        Http._navigator.dispatch(
          NavigationActions.navigate({routeName: LOGIN_ROUTE_KEY}),
        );
        // Logger.logError(CONSTANTS.ERROR.NETWORK, e);
        return reject(e);
      })
      .then(() => {
        Http._isRefreshingToken = false;
      });
  }

  static _validateSetup = method =>
    new Promise((resolve, reject) => {
      // client can be uninitiated when app is put to sleep in background
      //  and user logs in via bio or pin
      if (!Http._isInitiated) {
        // Setup
        // const user = UserDatabase.get();
        // if (!user) {
        //   return reject();
        // }
        // if (!__DEV__) {
        //   firebase.crashlytics().setUserEmail(`${user.username}`);
        // }
        // const isMock = isMockUser(user.username);
        // const isSandbox = isSandboxUser(user.username);
        //
        // Http._setupIsMockEnabled(isMock, isSandbox);
        // Http._setupUrls(isSandbox);
        //
        // if (isMock) {
        //   return resolve();
        // }

        // check to see if client has been initiated in the past, if so use existing token
        //  else reject with setup Error
        const token = TokenDatabase.get();
        if (token) {
          const {
            accessToken,
            accessTokenExpiration,
            refreshToken,
            tokenType,
          } = token;
          // if token is not expired continue using it
          if (moment(accessTokenExpiration).isAfter(moment())) {
            Http._client.defaults.headers.common.Authorization = `${tokenType} ${accessToken}`;
            Http._tokenInfo = {
              accessToken,
              accessTokenExpiration,
              refreshToken,
              tokenType,
            };
            return resolve();
          }
          return Http._refreshToken(refreshToken, resolve, reject);
        }
        return reject(
          new Error(
            `Please call Http.setup(baseURL) before making a call to the ${method} method`,
          ),
        );
        // client and token exist, check if token is expired
      }

      if (
        moment(Http._tokenInfo.accessTokenExpiration).isBefore(moment()) &&
        !Http._isRefreshingToken &&
        !Http._mock
      ) {
        return Http._refreshToken(
          Http._tokenInfo.refreshToken,
          resolve,
          reject,
        );
      }

      return resolve();
    });

  static _timeout = extendTimeout =>
    new Promise(resolve => {
      if (extendTimeout) {
        Http._client.timeout = CONSTANTS.NETWORK.EXTENDED_TIMEOUT;
      } else {
        Http._client.timeout = CONSTANTS.NETWORK.STANDARD_TIMEOUT;
      }
      resolve();
    });

  static get = (route, params = {}, timeout = false, axiosConfig = {}) =>
    Http._validateSetup('GET')
      .then(Http._timeout(timeout))
      .then(() =>
        Http._client
          .get(Http._route(route), params, axiosConfig)
          .then(response => response),
      )
      .catch(e => {
        Http._logNetworkError('GET', Http._route(route), params, e);
        throw this._handleError(e);
      });

  static post = (route, params = {}, timeout = false, axiosConfig = {}) =>
    Http._validateSetup('POST')
      .then(Http._timeout(timeout))
      .then(() =>
        Http._client
          .post(Http._route(route), params, axiosConfig)
          .then(response => response),
      )
      .catch(e => {
        Http._logNetworkError('POST', Http._route(route), params, e);
        throw this._handleError(e);
      });

  static patch = (route, params = {}, timeout = false, axiosConfig = {}) =>
    Http._validateSetup('PATCH')
      .then(Http._timeout(timeout))
      .then(() =>
        Http._client
          .patch(Http._route(route), params, axiosConfig)
          .then(response => response),
      )
      .catch(e => {
        Http._logNetworkError('PATCH', Http._route(route), params, e);
        throw this._handleError(e);
      });

  static put = (route, params = {}, timeout = false, axiosConfig = {}) =>
    Http._validateSetup('PUT')
      .then(Http._timeout(timeout))
      .then(() =>
        Http._client
          .put(Http._route(route), params, axiosConfig)
          .then(response => response),
      )
      .catch(e => {
        Http._logNetworkError('PUT', Http._route(route), params, e);
        throw this._handleError(e);
      });

  static delete = (route, params = {}, timeout = false, axiosConfig = {}) =>
    Http._validateSetup('DELETE')
      .then(Http._timeout(timeout))
      .then(() =>
        Http._client
          .delete(Http._route(route), params, axiosConfig)
          .then(response => response),
      )
      .catch(e => {
        Http._logNetworkError('DELETE', Http._route(route), params, e);
        throw this._handleError(e);
      });

  static _logNetworkError = (operation, route, params, error) => {
    if (__DEV__ && Config.LOG_NETWORK_ERROR === 'true') {
      Http._log(`Network related error: ${new Date().toISOString()}`);
      Http._log('Network Error Method: ', operation);
      Http._log('Network Error Route: ', route);
      Http._log('Network Error Params: ', params);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        Http._log('Network Error Response Data: ', error.response.data);
        Http._log('Network Error Response Status: ', error.response.status);
        Http._log('Network Error Response Headers: ', error.response.headers);
      }
      if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        Http._log('Network Error Request: ', error.request);
      }
      // Always log the message
      Http._log('Network Error Message: ', error.message);
    }
    if (!__DEV__) {
      // Logger.logError(CONSTANTS.ERROR.NETWORK, error);
    }
  };

  static _log(messagePrefix, message) {
    if (!__DEV__) {
      firebase.crashlytics().log(messagePrefix + message);
    } else if (__DEV__ && Config.LOG_NETWORK_ERROR === 'true') {
      // eslint-disable-next-line no-console
      console.log(messagePrefix, message);
    }
  }

  static _handleError(error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status >= 500 || error.response.status < 200) {
        return new Error(CONSTANTS.APPLICATION.GENERIC_ERROR);
      }
      // We'll parse out the error in the saga handler
      return error;
      // eslint-disable-next-line no-else-return
    }
    if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      return new Error(CONSTANTS.APPLICATION.GENERIC_ERROR);
    }
    // Something happened in setting up the request that triggered an Error
    return new Error(CONSTANTS.APPLICATION.GENERIC_ERROR);
  }
}

// private static var which should not be mutated or accessed outside this class
Http._client = axios.create({
  headers: {'Content-Type': 'application/json'},
});
Http._tokenInfo = null;
Http._apiUrl = null;
Http._idpUrl = null;
Http._mock = null; // expose mock to be mutated by test framework
Http._isRefreshingToken = false; // status to track token refresh to eliminate race conditions
Http._isSandbox = false; // are we using sandbox or production urls
Http._reduxStore = null; // set on app load used to dispatch
Http._navigator = null; // set on app load used to navigate to screen
