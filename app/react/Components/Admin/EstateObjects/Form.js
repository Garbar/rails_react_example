'use strict';
import {Link, History}     from 'react-router';
import Input      from '../FormElements/Input';
import MapInput   from '../FormElements/CoordinatesInput';
import actions    from '../../../actions/estatesActions';
import store      from '../../../stores/estateStore';

var Form = React.createClass({
  mixins: [History],
  getInitialState: function() {
    return {
      canSubmit: false,
      estate: {},
      saved: null
    };
  },
  componentDidMount: function() {
    if(this.props.params.id && !this.state.id) {
      actions.getEstate.onNext({id: this.props.params.id})
    }
    this.info_subscription = store.getViewerState.subscribe(function(data) {
      this.setState({estate: data.estate, saved: data.result});
      if(!this.props.params.id) {
        this.history.pushState(this.state, '/admin/estate_objects/edit/'+data.estate.id);
      }
      if(data.result === true || data.result == false) {
        setTimeout(function(){
          actions.saveResultShowed.onNext();
        }.bind(this),5000);
      }
    }.bind(this));
  },
  componentWillUnmount: function() {
    this.info_subscription.dispose();
  },
  submit(data) {
    data['lat'] = data.coordinates.lat;
    data['lng'] = data.coordinates.lng;
    if(this.props.params.id){
      data['id'] = this.props.params.id;
      actions.updateEstate.onNext({estate: data});
    } else {
      actions.createEstate.onNext({estate: data});
    }
  },
  enableButton() {
    this.setState({ canSubmit: true });
  },
  disableButton() {
    this.setState({ canSubmit: false });
  },

  saveAlert() {
    if(this.state.saved === true) {
      return (<div className="alert alert-success" role="alert">You object is successfully saved</div>);
    } else if(this.state.saved === false){
      return (<div className="alert alert-danger" role="alert">An error has occurred, please try again</div>);
    } else {
      return ('');
    }
  },
  render: function() {
    var value = this.state.estate;
    return (<div className="row">
      <ol className="breadcrumb">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/admin">Dashboard</Link></li>
        <li><Link to="/admin/estate_objects">Estate objects</Link></li>
        <li className="active">Estate object form</li>
      </ol>

      {this.saveAlert()}

      <Formsy.Form onSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton} className="form-horizontal">
        <h2>Estate object form</h2>
        <Input name="title" title="Title" type="text" required value={value.title} />
        <Input name="country" title="Country" type="text" required value={value.country} />
        <Input name="city" title="City" type="text" required value={value.city} />
        <Input name="address" title="Address" type="text" required value={value.address} />
        <Input name="price" title="Price" type="text" required validations="isNumeric" value={value.price} />
        <MapInput mapId="search-map" name="coordinates" value={[value.lat, value.lng]} title="Set place with marker" />
        <div className="form-group">
          <div className="col-xs-offset-2 col-xs-10">
              <button type="submit" className="btn btn-primary" disabled={!this.state.canSubmit}>Done</button>
          </div>
        </div>

      </Formsy.Form>


    </div>
    );
  }
});

module.exports = Form;
