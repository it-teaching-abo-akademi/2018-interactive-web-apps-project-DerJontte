import {Currency} from "./Currency";
import React, {Component} from "react";

export default class MainMenu extends Component {
    render() {
        return (
            <div className="main_menu">
                <nav>
                    <li onClick={this.props.caller.addPortfolio.bind(this.props.caller)}>Create New Portfolio</li>
                    <li onClick={this.props.caller.updateValues.bind(this.props.caller)}>Update stock values</li>
                    <li onClick={this.props.caller.updateForex.bind(this.props.caller)}>Update exchange rate</li>
                </nav>
                <p>
                    1 EUR = {Currency.EtoD()} USD<br/>
                    1 USD = {Currency.DtoE()} EUR
                </p>
            </div>
        )
    }
}

