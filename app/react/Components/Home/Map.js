'use strict';
import L        from 'leaflet'


var Map = React.createClass({
  componentDidMount: function() {
    this.renderMap();
  },

  renderMap: function() {
    var map = L.map('object_map').setView([55.747158, 37.6357793], 13);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    this.setState({map: map});
  },

  render: function() {
    return(<div id="object_map" style={{height:900+'px'}} ></div>);
  }
});
module.exports = Map;
