import React, {Component} from "react";
import ReactDOM from "react-dom";

export default class TopMenu extends Component {
    constructor(props) {
        super(props);
    }

    clearLocal() {
        localStorage.clear();
    }

    render() {
        return(
            <div class="col-10 top_menu">
                <button onClick={this.props.add_portfolio}>Create New Portfolio</button>
                <button onClick={this.clearLocal.bind(this)}>Clear localStorage</button>
            </div>
        )
    }
}