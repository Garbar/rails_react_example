'use strict';
import {Link}     from 'react-router';
import actions    from '../../../actions/estatesActions';
import store      from '../../../stores/estatesStore';

var ObjectsTable = React.createClass({
  getInitialState: function() {
    return {
      estates: []
    };
  },

  componentDidMount: function() {
    actions.getEstates.onNext();
    this.info_subscription = store.getViewerState.subscribe(function(data) {
      this.setState({estates: data.estates});
    }.bind(this));

  },
  componentWillUnmount: function() {
    this.info_subscription.dispose();
  },
  deleteEstate: function(estate, e) {
    e.preventDefault();
    actions.deleteEstate.onNext({id: estate.id});
  },
  render: function() {
    var rows = [];
    if(this.state.estates.length > 0) {
      rows = this.state.estates.map(function(e, i) {
        return(<tr key={i}>
            <td>{e.title}</td>
            <td>{[e.country, e.city, e.address].join(', ')}</td>
            <td>{e.price}</td>
            <td>
              <div className="actions" >
                <Link to={`\/admin\/estate_objects\/edit\/${e.id}`} className="glyphicon glyphicon-pencil" title="Edit"></Link>
                <a href="#" onClick={this.deleteEstate.bind(null, e)} className="glyphicon glyphicon-remove" title="Delete"></a>
              </div>
            </td>
        </tr>);
      }.bind(this));
    }
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
            {rows}
          </tbody>
        </table>
      </div>
    </div>
    );
  }
});

module.exports = ObjectsTable;
