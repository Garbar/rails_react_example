'use strict';

import api from '../api/loginApi';
import Rx from 'rx/dist/rx.all';

import Auth from 'j-toker';

var onLogin = new Rx.Subject();
var onLogout = new Rx.Subject();


var LoginActions = {
  login: (params) => {
    api.login(params).then( (response) => {
      $.ajaxSetup({
        beforeSend: function(xhr, settings) {
          // append outbound auth headers
          Auth.appendAuthHeaders(xhr, settings);
        }
      });
      LoginActions.onLogin.onNext(response);
    })
  },
  logout: () => {
    api.logout().then( (response) => {
       LoginActions.onLogout.onNext(response);
    })
  },
  onLogin: onLogin,
  onLogout: onLogout

};

export default LoginActions;
