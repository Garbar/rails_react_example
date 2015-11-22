'use strict';
import Map          from './Map';
import ObjectsList  from './ObjectsList';
import actions      from '../../actions/estatesActions';

var Home = React.createClass({
  componentDidMount: function() {
    actions.getEstates.onNext();
  },
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
