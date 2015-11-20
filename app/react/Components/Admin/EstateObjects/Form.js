'use strict';
import {Link} from 'react-router';

var Form = React.createClass({
  render: function() {
    return (<div className="row">
      <ol className="breadcrumb">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/admin">Dashboard</Link></li>
        <li><Link to="/admin/estate_objects">Estate objects</Link></li>
        <li className="active">Estate object form</li>
      </ol>

      <div className="alert alert-success" role="alert">You object is successfully saved</div>

      <form className="form-horizontal" >
        <h2>Estate object form</h2>
        <div className="form-group">
          <label className="control-label col-xs-2">Title</label>
          <div className="col-xs-10">
            <input type="text" className="form-control" placeholder="Title" />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-xs-2">Address</label>
          <div className="col-xs-10">
            <input type="text" className="form-control"  placeholder="Address" />
          </div>
        </div>
        <div className="form-group">
          <div className="col-xs-offset-2 col-xs-10">
              <button type="submit" className="btn btn-primary">Done</button>
          </div>
        </div>
      </form>



    </div>
    );
  }
});

module.exports = Form;
