import React, { Component } from 'react';
import PortfolioView from "./PortfolioView";
import TopMenu from "./TopMenu";
import {Portfolio, StockEntry} from "./DataTypes";

export default class App extends Component {
    portfolios = [];
    state = {counter: 0}

    constructor() {
        super();
        if ("portfolios" in localStorage) {
            let tempStore = localStorage.getItem("portfolios");
            tempStore = JSON.parse(tempStore);
            for(let i = 0; i < tempStore.length; i++) {
                if (tempStore[i] != null) this.portfolios.push(tempStore[i]);
            }
        }
        if ("state" in localStorage) {
            let tempStore = localStorage.getItem("state");
            this.state = JSON.parse(tempStore);
        }
    }

    saveState() {
        localStorage.setItem("portfolios", JSON.stringify(this.portfolios));
        localStorage.setItem("state", JSON.stringify(this.state));
    }

    addPortfolio() {
        this.portfolios.push(new Portfolio(this.state.counter));
        this.setState((state, props) => {
            return {counter: state.counter + 1};
        }, this.saveState());
    }

    deletePortfolio(idx) {
        for (let i = 0; i < this.portfolios.length; i++) {
            if(this.portfolios[i] !== undefined && this.portfolios[i] != null) {
                if (this.portfolios[i].id === idx) {
                    delete this.portfolios[i];
                }
            }
        }
        this.setState({});
        this.saveState();
    }

    render() {
        let context = {

        }
        return (
            <div className="App">
                <TopMenu add_portfolio={this.addPortfolio.bind(this)} />
                <PortfolioView portfolios={this.portfolios} delete_portfolio={(idx) => this.deletePortfolio(idx)} save_state={this.saveState.bind(this)} />
            </div>
        );
    }
}