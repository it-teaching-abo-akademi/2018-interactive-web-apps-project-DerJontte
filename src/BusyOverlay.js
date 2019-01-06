import React, { Component } from "react";
import gear from "./BusyGear.svg";
import "./BusyOverlay.css";

export default class BusyOverlay extends Component {
    static set() {
        this.overlay = document.getElementById("busy_overlay");
        this.overlay.style.visibility = "visible";
    }

    static unset() {
        this.overlay.style.visibility = "hidden";
    }

    render() {
        return (
            <div id="busy_overlay">
                <p id="busy_dialog">
                    Loading, please wait...
                    <p>
                        <img src={gear} id="busy_gear"/>
                    </p>
                </p>
            </div>
        )
    }
}