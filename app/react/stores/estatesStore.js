'use strict';
import Rx         from 'rx/dist/rx.all';
import actions    from '../actions/estatesActions';
import api        from '../api/estatesApi';


// helpers
function findEstate(estates, id){
   var res = estates.filter(function(e) { return e.id === id })[0];
   return {
      estate: res,
      index: estates.indexOf(res)
    };
};

var viewerState  = new Rx.ReplaySubject(1);


var handlers = [
  actions.getEstates.flatMap(function() {
    return Rx.Observable.fromPromise(api.getEstates())
  }).map(function(data) {
    return function(state) {
      var new_state = {estates: data.estates}
      return new_state;
    }
  }),
  actions.deleteEstate.map(function(data) {
    return function(state) {
      api.deleteEstate(data.id);
      var estates = state.estates;
      var estate = findEstate(state.estates, data.id);
      estates.splice(estate.index, 1)
      return {estates: estates};
    }
  }),
  actions.onEMouseOver.map(function(data) {
    return function(state) {
      state['hoverId'] = data.id;
      return state;
    }
  }),
  actions.onEMouseOut.map(function() {
    return function(state) {
      state['hoverId'] = null;
      return state;
    }
  })

]


var actionsStream = Rx.Observable.merge(handlers);

var state = actionsStream.scan(function(state, transformer) {
  var new_state = transformer(state);
  return new_state;
}, {});

state.subscribe(function(data) {
  viewerState.onNext(data)
});




var menuViewerStore =  {
   getViewerState: viewerState
}
export default menuViewerStore;
