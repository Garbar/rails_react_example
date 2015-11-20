'use strict';
import {Link} from 'react-router';

var ObjectsTable = React.createClass({
  render: function() {
    return (<div className="row">
      <ol className="breadcrumb">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/admin">Dashboard</Link></li>
        <li className="active">Estate objects</li>
      </ol>
      <div className="panel panel-default">
        <div className="panel-heading">
          Estate objects
        </div>
        <div className="panel-body">
          <Link to="/admin/estate_objects/new" className="btn btn-primary new-object " >New object</Link>
        </div>

        <table className="admin-table table table-bordered table-striped">
          <thead>
            <tr>
                <th>Title</th>
                <th>Address</th>
                <th>Price</th>
                <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
                <td>Title</td>
                <td>John</td>
                <td>Carter</td>
                <td>
                  <div className="actions" >
                    <Link to="/admin/estate_objects/edit/1" className="glyphicon glyphicon-pencil" title="Edit"></Link>
                    <a href="#" className="glyphicon glyphicon-remove" title="Delete"></a>
                  </div>
                </td>
            </tr>
            <tr>
                <td>Title</td>
                <td>Peter</td>
                <td>Parker</td>
                <td>
                  <div className="actions" >
                    <a href="#" className="glyphicon glyphicon-pencil" title="Edit"></a>
                    <a href="#" className="glyphicon glyphicon-remove" title="Delete"></a>
                  </div>
                </td>
            </tr>
            <tr>
                <td>Title</td>
                <td>John</td>
                <td>Rambo</td>
                <td>
                  <div className="actions" >
                    <a href="#" className="glyphicon glyphicon-pencil" title="Edit"></a>
                    <a href="#" className="glyphicon glyphicon-remove" title="Delete"></a>
                  </div>
                </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    );
  }
});

module.exports = ObjectsTable;
