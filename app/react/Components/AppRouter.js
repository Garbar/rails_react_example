'use strict';
import { Router, Route, Link, IndexRoute} from 'react-router';
import Body             from './Common/Body';
import Home             from './Home/Home';
import Admin            from './Admin/Admin';

import Dashboard        from './Admin/Dashboard/Dashboard';

import EstateObjects    from './Admin/EstateObjects/Index';
import EstateTable      from './Admin/EstateObjects/ObjectsTable';
import EstateForm       from './Admin/EstateObjects/Form';

var AppRouter = React.createClass({
  render: function() {

    return (
      <Router>
        <Route path="/" component={Body} >
          <IndexRoute component={Home} />
          <Route path="admin" component={Admin} >
            <IndexRoute component={Dashboard} />
            <Route path="estate_objects" component={EstateObjects} >
              <IndexRoute component={EstateTable} />
              <Route path="edit/:id" component={EstateForm}/>
              <Route path="new" component={EstateForm}/>
            </Route>
          </Route>
        </Route>
      </Router>
    );
  }
});

module.exports = AppRouter;
