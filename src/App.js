import React, { Component } from 'react';
import PortfolioView from "./PortfolioView";
import TopMenu from "./TopMenu";
import {Portfolio, StockEntry} from "./DataTypes";

export default class App extends Component {
    portfolios = [];
    counter = 0;

    constructor() {
        super();
        if ("portfolios" in localStorage) {
            let savedPortfolios = JSON.parse(localStorage.getItem("portfolios"));
            for (let i = 0; i < savedPortfolios.length; i++) {
                let p = savedPortfolios[i];
                if (p === null) continue;
                let toPush = new Portfolio(p.id, p.name);
                toPush.entries = p.entries;
                toPush.selected = p.selected;
                toPush.value = p.value;
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

    render() {
        return (
            <div className="App">
                <div className="col-10 top_menu">
                    <button onClick={this.addPortfolio.bind(this)}>Create New Portfolio</button>
                    <button onClick={this.clearLocal.bind(this)}>Clear localStorage</button>
                </div>
                <PortfolioView portfolios={this.portfolios} saveState={this.saveState.bind(this)} />
            </div>
        );
    }
}

// TODO: b. User should be able to enter the portfolio name
// TODO: c. The maximum number of portfolios that can be created is 10
// TODO: 2. Remove a portfolio 5pt
// TODO: a. The user can delete a portfolio
// TODO: 3. Add stock 10p
// TODO: a. User must enter the symbol of the stock
// TODO: b. User must be able to enter the total number of shares in a stock
// TODO: c. The maximum number of symbols (different stocks) in a portfolio is 50
// TODO: d. There is no limit on the number of stocks a portfolio can contain
// TODO: 4. View portfolio 10pt
// TODO: a. User must be able to change the currency between US dollar and Euro.
// TODO: b. User must be able to view the current values of the stocks in the portfolio.
// TODO: c. User must be able to view the total value of the portfolio.
// TODO: 5. Compare stock value performances in a portfolio 15pt
// TODO: a. User must be able to see a graph showing the historic valuation of the stocks
// TODO: b. User must be able to adjust the time window of the graph by selecting the starting and ending date of the graph.
// TODO: 6. Remove stock 5pt
// TODO: a. User can remove stocks from a portfolio
// TODO: 7. You need to use the persistent local storage to save all data related to the created portfolios. (That is, after closing and opening the browser the portfolio should still be available) 5pt
// TODO: 8. You are free to decide on the layout and look of your application. The usability of your application will be taken into account when evaluating your solution. And the layout should be responsive!!! 5p