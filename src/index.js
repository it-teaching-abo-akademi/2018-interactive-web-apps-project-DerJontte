/*
    This file renders the root elements of the app, which are three distinct layers. "App" is the main part of
    the application, "BusyOverlay" is a layer that grays out the main app and shows a rotating gear during tasks
    that prevent using the app (ie. time consuming server requests), and "PerformanceGraph" is a layer that grays
    out the main app and presents the user with the historical data of a selected stock.
 */

import React from "react";
import ReactDOM from "react-dom";
import "./Styles.css";
import App from "./App";
import BusyOverlay from "./BusyOverlay";
import PerformanceGraph from "./PerformanceGraph";

let components = [<App />,<BusyOverlay />, <PerformanceGraph/>];
ReactDOM.render(components, document.getElementById("root"));
