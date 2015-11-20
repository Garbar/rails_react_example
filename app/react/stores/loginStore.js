'use strict';

import LoginActions from '../actions/loginActions';

var loginStore = {
  onLogin: LoginActions.onLogin,
  onLogout: LoginActions.onLogout
};

export default loginStore;
