import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import App from './App';
import BusyOverlay from "./BusyOverlay";
import BottomBar from "./BottomBar";
import PerfGraph from "./PerfGraph";

let components = [<App />,<BusyOverlay />, <PerfGraph/>];
ReactDOM.render(components, document.getElementById("root"));
