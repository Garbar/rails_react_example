'use strict';
import L          from 'leaflet'
import store      from '../../stores/estatesStore';
import actions    from '../../actions/estatesActions';
require('leaflet-control-geocoder');

var ObjectsList = React.createClass({
  getInitialState: function() {
    return {
      estates: [],
      hoverId: null
    };
  },
  componentDidMount: function() {
    this.info_subscription = store.getViewerState.subscribe(function(data) {
      this.setState({estates: data.estates});
    }.bind(this));
  },

  componentWillUnmount: function() {
    this.info_subscription.dispose();
  },
  mouseOver: function(e) {
    actions.onEMouseOver.onNext(e);
  },
  render: function() {
    var rows = [];
    if(this.state.estates.length) {
      rows = this.state.estates.map(function(e, i) {
        return(<div className="media"  key={i}>
          <a className="pull-left" href="#" onMouseOver={this.mouseOver.bind(null, e)}>
            <img alt="Media Object" className="media-object" src="http://placehold.it/64x64" />
          </a>
          <div className="media-body">
            <h4 className="media-heading">{e.title}</h4>
            <span>Address: {[e.country, e.city, e.address].join(', ')}</span>
            <br/>
            <span className="label label-success">Price: {e.price} </span>
          </div>
        </div>)
      }.bind(this));
    }
    return (
      <div className="row">
        <h2>Objects</h2>
        {rows}
      </div>

    );
  }
});

module.exports = ObjectsList;
