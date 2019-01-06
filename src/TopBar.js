import {Currency} from "./Currency";
import React, {Component} from "react";

export default class TopBar extends Component {
    render() {
        return (
            <div className="top_bar">
                <div class="top_bar_buttons">
                    <button onClick={this.props.caller.addPortfolio.bind(this.props.caller)}>Create New Portfolio</button>
                    <button onClick={this.props.caller.updateValues.bind(this.props.caller)}>Update stock values</button>
                    <button onClick={this.props.caller.updateForex.bind(this.props.caller)}>Update exchange rate</button>
                </div>
                <table class="top_bar_table">
                    1 EUR = {Currency.EtoD()} USD<br/>
                    1 USD = {Currency.DtoE()} EUR
                </table>
            </div>
        )
    }
}

