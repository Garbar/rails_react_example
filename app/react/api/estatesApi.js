'use strict';
import crud from './crud'
const BASE_URL = API_URL + '/api/v1/estates/';

var getEstates = function() {
  return crud.get(BASE_URL);
};
var getEstate = function(params) {
  return crud.get(BASE_URL + params.estate.id);
};

var createEstate = function(params) {
  return crud.create(BASE_URL, params);
};

var updateEstate = function(params) {
  return crud.update(BASE_URL + params.estate.id, params);
};

var deleteEstate = function(params) {
  return crud.delete(BASE_URL + params.estate.id, params);
};

var estatesApi =  {
  getEstates: getEstates,
  getEstate: getEstate,
  createEstate: createEstate,
  updateEstate: updateEstate,
  deleteEstate: deleteEstate
};

module.exports = estatesApi;
