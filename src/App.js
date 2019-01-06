import React, { Component } from 'react';
import PortfolioView from "./PortfolioView";
import {Portfolio, StockEntry} from "./DataTypes";
import StockServerData from "./StockServerData";
import {Currency} from "./Currency";
import BusyOverlay from "./BusyOverlay";
import TopBar from "./TopBar";

export default class App extends Component {
    portfolios = [];
    counter = 0;

    constructor() {
        super();

        this.updateForex();
        if ("portfolios" in localStorage) {
            let savedPortfolios = JSON.parse(localStorage.getItem("portfolios"));
            for (let i = 0; i < savedPortfolios.length; i++) {
                let p = savedPortfolios[i];
                if (p === null) continue;
                let toPush = new Portfolio(p.id, p.name);
                for(let j = 0; j < p.entries.length; j++) {
                    var tempStock = p.entries[j]
                    toPush.addStock(new StockEntry(tempStock.symbol, tempStock.value, tempStock.amount, tempStock.updated));
                }
                toPush.selected = p.selected;
                toPush.currency = p.currency;
                this.portfolios.push(toPush);
                if (this.counter < p.id) this.counter = p.id;
            }
            this.counter += 1;
        }
    }

    saveState() {
        localStorage.setItem("portfolios", JSON.stringify(this.portfolios));
        this.setState({});
    }

    clearLocal() {
        localStorage.clear();
        document.location.reload();
    }

    addPortfolio() {
        if (this.portfolios.length >= 10) {
            alert("The maximum number of portfolios has been reached.\nPlease delete an existing portfolio before creating a new one.");
            return;
        }
        let name = prompt("Please enter a name for the new portfolio.");
        if (name == undefined) return;
        this.portfolios.push(new Portfolio(this.counter, name));

        this.counter += 1;
        this.saveState();
    }

    updateValues() {
        this.portfolios.forEach(async portfolio => {
            let newValue = 0;
            for (let i = 0; i < portfolio.entries.length; i++) {
                let result = await StockServerData.getCurrentStockValue(this, portfolio.entries[i].symbol);
                if (result != 200) {
                    alert("Status " + result + ": Could not fetch all stock values, please try again later");
                    return result;
                }
                newValue += portfolio.entries[i].totalValue;
            }
            portfolio.value = newValue;
            this.saveState();
        });
    }

    updateForex() {
        StockServerData.getCurrentForex(this);
    }

    render() {
        return (
            <div className="App">
                <TopBar caller={this}/>
                <PortfolioView portfolios={this.portfolios} saveState={this.saveState.bind(this)} />
            </div>
        );
    }
}