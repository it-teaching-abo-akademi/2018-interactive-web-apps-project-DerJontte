import React from 'react';
import ReactDOM from 'react-dom';
import './Styles.css';
import App from './App';
import BusyOverlay from "./BusyOverlay";
import PerfGraph from "./PerfGraph";

let components = [<App />,<BusyOverlay />, <PerfGraph/>];
ReactDOM.render(components, document.getElementById("root"));
