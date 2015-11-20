import 'leaflet/dist/leaflet.css';


import React          from "react";
import bootstrap      from 'react-bootstrap'
import ReactDOM       from "react-dom";
import AppRouter      from "./Components/AppRouter";

import createHistory  from 'history/lib/createHashHistory';


ReactDOM.render(
  <AppRouter />,
  $('#root')[0]
);
