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

//массив обработчиков экшнов
var handlers = [
  actions.getEstates.flatMap(function(rq_params) {
    return Rx.Observable.fromPromise(api.getEstates(rq_params)) //вызов апи
  }).map(function(data) {  // на входе результат вызова апи
    return function(state){  // текущий стейт
      var new_state = {estates: data.estates} // меняем стейт по усмотрению
      return new_state;  // то, что будет новый состоянием
    }
  }),



  actions.showMenu.map(function(data) {
                            return function(state){
                              var res = findMenu(state.menus, data.id);
                              if (res.menu) {
                                if (state.current) saveCurrent(state.menus, state.current, true);
                              };
                              constructor_actions.loadMenu.onNext(data.id); // посылаем данные в другой стор, чтобы инициализировать конструктор менюшек
                              return state;
                            };
                       }),

  actions.deleteMenu.map(function(data) {
                            return function(state){
                              var menu = findMenu(state.menus, data.id);
                              if (menu.menu) {
                                state.menus.splice(menu.index, 1);
                                if (state.current && state.current.menu.id === data.id) {
                                  state.current = null;
                                }
                              }
                              return state;
                            };
                        }),
  constructor_store.getMenuState.map(function(data) {
                            return function(state){
                              replaceTitle(state.menus, data.menu)
                              state.current = data;
                              return state;
                            };
                       }),

]


var actionsStream = Rx.Observable.merge(handlers); // объединяем обработчики в один поток
var state = actionsStream.scan({}, function(state, transformer) {  // типа reduce, достает состояние и применяет функцию, приписаную к обработчику
  var new_state = transformer(state);
  return new_state;
})

state.subscribe(function(data) {viewerState.onNext(data)}); // порождаем новый поток, чтобы не было багов с hot и cold observers




var menuViewerStore =  {
   getViewerState: viewerState // наш поток изменения от стора
}
export default menuViewerStore;
