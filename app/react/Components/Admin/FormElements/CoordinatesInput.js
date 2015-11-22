'use strict';
import L                      from 'leaflet'
import Formsy                 from 'formsy-react';
require('leaflet-control-geocoder');

var Input = React.createClass({
  mixins: [Formsy.Mixin],
  getInitialState: function() {
    return {
      defValue: [55.7498598, 37.3523235]
    };
  },

  changeValue(latLng) {
    this.setValue(latLng);
  },
  componentDidMount: function() {
    this.renderMap();
  },
  renderMap: function() {
    L.Icon.Default.imagePath = '/images/';
    var position = this.getValue();
    if(position.length != 2 || position[0] === undefined || position[1] === undefined) {
      position = [55.7498598, 37.3523235];
    }
    var map = L.map(this.props.mapId).setView(position, 13);
    var marker = new L.Marker(position, {draggable: true}).addTo(map);
    marker.on('dragend', function(e) {
      console.log('changed coords', e.target._latlng);
      var latlng = e.target._latlng;
      this.changeValue(latlng);
    }.bind(this));
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    var geocoder = L.Control.geocoder().addTo(map);
    var search_marker;
    geocoder.markGeocode = this.markGeocode;
    map.invalidateSize();
    this.setState({map: map, marker: marker});
  },
  markGeocode: function(result) {
    console.log('result', result);
    this.state.map.fitBounds(result.bbox);
    this.changeValue(result.center);
		this.state.marker.setLatLng(result.center);
		return this;
  },
  render: function() {
    var value = this.getValue();
    if(this.state.map && value[0] !== undefined && value[0] !== null
    && value[1] !== undefined && value[1] !== null ) {
      this.state.marker.setLatLng(value);
      this.state.map.setView(new L.LatLng(value[0], value[1]), 7);
    }
    var height = this.props.height ? this.props.height : 300;
    var id = this.props.mapId ? this.props.mapId : 'searh_map';
    return (<div className="form-group">
      <label className="control-label col-xs-2">{this.props.title}</label>
      <div className="col-xs-offset-2 col-xs-10">

        <div id={this.props.mapId} style={{height:300+'px'}} ></div>
      </div>
    </div>);
  }
});
module.exports = Input;
