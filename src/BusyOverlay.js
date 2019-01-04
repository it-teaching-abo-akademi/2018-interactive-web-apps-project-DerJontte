import React, { Component } from 'react';

export default class Busy extends Component {
    static set() {
        this.modal = document.getElementById("busy_modal");
        this.modal.style.visibility = "visible";
    }

    static unset() {
        this.modal.style.visibility = "hidden";
    }

    render() {
        let divStyle = {
            position: "fixed",
            display: "flex",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            margin: 0,
            backgroundColor: "black",
            opacity: "0.3",
            visibility: "hidden",
            cursor: "wait"
        }
        let pStyle = {
            borderRadius: "10px",
            border: "3px dashed #1c87c9",
            color: "white",
            margin: "auto",
            textAlign: "center",
        }

        return(
            <div id="busy_modal" style={divStyle}>
                <p style={pStyle}>
                    Loading, please wait...
                </p>
            </div>
        )
    }
}