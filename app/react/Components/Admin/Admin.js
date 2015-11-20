'use strict';
import Auth           from 'j-toker';
import AuthForm       from './Login/AuthForm';
import loginActions   from '../../actions/loginActions';
import loginStore     from '../../stores/loginStore';
import Spinner        from './Login/Spinner';

var Admin = React.createClass({
  getInitialState: function() {
    return {
      loggedIn: null
    };
  },
  componentDidMount: function() {
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
  },
  render: function() {

    if (this.state.loggedIn === false) {
      return ( <AuthForm actions={loginActions}/> );
    } else if (this.state.loggedIn === null) {
      return ( <Spinner /> );
    } else if (this.state.loggedIn === true) {
      return (
        <div className="container">
          {this.props.children}
        </div>
      );
    }
  }
});
module.exports = Admin;
