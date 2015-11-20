'use strict';

import Auth from 'j-toker';


var api = {
  login: function (params) {
    return Auth.emailSignIn({
      email:    params.email,
      password: params.password
    })
      .done(function(data) {
        return data;
      })
      .fail(function(data) {
        console.log('fail api status', data.status)
        return data;
      });
  },

  logout: function () {
    return Auth.signOut()
      .done(function(data) {
        return data;
      })
      .fail(function(data) {
        console.log('fail api status', data.status)
        return data;
      });
  }

};

export default api;

