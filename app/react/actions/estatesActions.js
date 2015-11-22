'use strict';
import Rx from 'rx/dist/rx.all';

var actions = {
  getEstate: new Rx.Subject(),
  getEstates: new Rx.Subject(),
  deleteEstate: new Rx.Subject(),
  createEstate: new Rx.Subject(),
  updateEstate: new Rx.Subject(),
  saveResultShowed: new Rx.Subject(),
  onEMouseOver: new Rx.Subject(),
  onEMouseOut: new Rx.Subject(),
}
module.exports = actions;
