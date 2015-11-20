'use strict';
import {Link} from 'react-router';

var TopMenu = React.createClass({
  render: function() {
    return (<nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
      <div className="container">
        <div className="collapse navbar-collapse">
          <ul className="nav navbar-nav">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/admin">Sign in</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>);
  }
});

module.exports = TopMenu;
