'use strict';
import Auth           from 'j-toker';
import {Link}         from 'react-router';
import actions        from '../../actions/loginActions';
import loginStore     from '../../stores/loginStore';

var TopMenu = React.createClass({
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
      .fail( () => { this.setState({loggedIn: false }) });
    this.login_subscription = loginStore.onLogin.subscribe( (response) => {
      this.setState({loggedIn: true });
    });

    this.logout_subscription = loginStore.onLogout.subscribe( (response) => {
      this.setState({loggedIn: false});
    });
  },
  logOut: function(e) {
    e.preventDefault();
    actions.logout();
  },
  topLink: function() {
    if(this.state.loggedIn === true) {
      return (
        <ul className="nav navbar-nav">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/admin">Admin</Link>
          </li>
          <li>
            <Link to="/admin/estate_objects">Edit objects</Link>
          </li>
          <li>
            <a href="#" onClick={this.logOut} >Logout</a>
          </li>
        </ul>
      )
    } else {
      return (<ul className="nav navbar-nav">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/admin">Sign in</Link>
        </li>
      </ul>);
    }
  },
  render: function() {
    return (<nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div className="container">
        <div className="collapse navbar-collapse">
          {this.topLink()}
        </div>
      </div>
    </nav>);
  }
});

module.exports = TopMenu;
