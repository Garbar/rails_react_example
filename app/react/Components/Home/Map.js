'use strict';
import L        from 'leaflet'
import store      from '../../stores/estatesStore';
require('leaflet-control-geocoder');

var Map = React.createClass({
  getInitialState: function() {
    return {
      map: null,
      hoverId: null,
      estates: []
    };
  },
  componentDidMount: function() {
    this.renderMap();
    this.info_subscription = store.getViewerState.subscribe(function(data) {
      this.setState({estates: data.estates, hoverId: data.hoverId});
    }.bind(this));
  },

  componentWillUnmount: function() {
    this.info_subscription.dispose();
  },

  renderMap: function() {
    L.Icon.Default.imagePath = '/images/';
    var map = L.map('object_map').setView([55.747158, 37.6357793], 13);
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    this.setState({map: map});
  },

  render: function() {
    if(this.state.map !== null && this.state.estates.length) {
      this.state.estates.map(function(estate) {
        if(estate.lat && estate.lng) {
          var marker = new L.Marker([estate.lat, estate.lng]).addTo(this.state.map)
            .bindPopup('<div>'+
              '<b>' + estate.title + '</b>' +
              '<p>' + [estate.city, estate.country, estate.address].join(', ') + '</p>' +
            '</div>');
          if(this.state.hoverId == estate.id) {
            marker.openPopup();
            this.state.map.setView([estate.lat, estate.lng]);
          }
        }
      }.bind(this));
    }
    return(<div id="object_map" style={{height:900+'px'}} ></div>);
  }
});
module.exports = Map;
