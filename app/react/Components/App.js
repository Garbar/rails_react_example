'use strict';

import React      from 'react';
import Router     from 'react-router';
import Auth       from 'j-toker';


var RouteHandler = Router.RouteHandler;

export default class App extends React.Component {

  constructor(...args) {
    super(...args);

    this.state = {
      loggedIn: null
    };
    Auth.configure({apiUrl: `http:\/\/${location.host}`});
    $.ajaxSetup({
      beforeSend: function(xhr, settings) {
        // append outbound auth headers
        Auth.appendAuthHeaders(xhr, settings);
      }
    });
    Auth.validateToken()
      .then( (user) => { this.setState({loggedIn: true }) })
      .fail( () => { this.setState({loggedIn: false }) })

    this.login_subscription = loginStore.onLogin.subscribe( (response) => {
      this.setState({loggedIn: true });
    });

    this.logout_subscription = loginStore.onLogout.subscribe( (response) => {
      this.setState({loggedIn: false});
    });



  }

  contextTypes() {
    router: React.PropTypes.func
  }

  render() {



    if (this.state.loggedIn === false) {
      return (
          <Login actions={LoginActions}/>
      );
    } else if (this.state.loggedIn === null) {
      return (
          <Spinner />
      );
    } else if (this.state.loggedIn === true) {
      return (
          <div className='app' id="wrapper">

            <LeftNav loadData={LeftNavActions.fetch_data} store={navStore} />

            <div id="page-wrapper" className="gray-bg">
              <TopNavBar />
              <RouteHandler />
              <Footer />
            </div>

          </div>
      );
    }

  }

}
