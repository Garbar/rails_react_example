'use strict';
import {Link} from 'react-router';


var Dashboard = React.createClass({
  render: function() {
    return ( <div className="row">
        <ol className="breadcrumb">
          <li><Link to="/">Home</Link></li>
          <li className="active">Dashboard</li>
        </ol>
        <h2>Dashboard</h2>
        <Link to="/admin/estate_objects">Estates objects</Link>
      </div>
    );
  }
});

module.exports = Dashboard;
