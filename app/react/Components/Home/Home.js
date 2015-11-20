'use strict';
import Map          from './Map';
import ObjectsList  from './ObjectsList';


var Home = React.createClass({
  render: function() {
    return(<div>
        <div className="col-md-8">
          <Map />
        </div>
        <div className="col-md-4">
          <ObjectsList />
        </div>
      </div>
    );
  }
});
module.exports = Home;
