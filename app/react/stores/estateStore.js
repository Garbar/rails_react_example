'use strict';
import Rx         from 'rx/dist/rx.all';
import actions    from '../actions/estatesActions';
import api        from '../api/estatesApi';



var viewerState  = new Rx.ReplaySubject(1);


var handlers = [
  actions.getEstate.flatMap(function(data) {
    return Rx.Observable.fromPromise(api.getEstate(data))
  }).map(function(data) {
    return function(state) {
      var new_state = {estate: data.estate}
      if(state.result) {
        new_state['result'] = state.result;
      }
      return new_state;
    }
  }),
  actions.createEstate.flatMap(function(data) {
    return Rx.Observable.fromPromise(api.createEstate(data))
  }).map(function(data) {
    return function(state) {
      var new_state = {estate: data.estate, result: true}
      return new_state;
    }
  }),
  actions.updateEstate.flatMap(function(data) {
    return Rx.Observable.fromPromise(api.updateEstate(data))
  }).map(function(data) {
    return function(state) {
      var new_state = {estate: data.estate, result: true}
      return new_state;
    }
  }),
  actions.saveResultShowed.map(function() {
    return function(state) {
      var new_state = {estate: state.estate, result: null};
      return new_state;
    }
  })
]


var actionsStream = Rx.Observable.merge(handlers);

var state = actionsStream.scan(function(state, transformer) {
  var new_state = transformer(state);
  return new_state;
}, {result: null});

state.subscribe(function(data) {
  viewerState.onNext(data)
});


var menuViewerStore =  {
   getViewerState: viewerState
}
export default menuViewerStore;
