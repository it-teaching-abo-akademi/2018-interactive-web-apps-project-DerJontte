/*
    This class renders the root of the main app and contains some of the application-wide logic.
 */

import React, { Component } from "react";
import styled from "styled-components";
import TopBar from "./TopBar";
import PortfolioView from "./PortfolioView";
import Portfolio from "./Portfolio";
import StockEntry from "./StockEntry";
import StockServerData from "./StockServerData";

export default class App extends Component {
    portfolios = [];
    counter = 0;

    constructor() {
        /* When the page is (re-)loaded, the constructor checks the persistent local storage on the client machine
         * for stored portfolios and loads them into the app. The currency exchange rate is updated automatically at
         * this point, but stock values are not (so that usage quotas for unpaid AlphaVantage accounts will last longer).
         * A counter is set up for quick assignment of unique id's to portfolios and DOM elements. */
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
        /* Method to save the current state of the portfolios. The class' setState is called so that any changes in
        * DOM-elements will be rendered on the page. This method should be called after all changes in the child nodes,
        * especially changes to portfolios, to ensure that the persistent local storage and the displayed data in the app
        * is up to date. */
        localStorage.setItem("portfolios", JSON.stringify(this.portfolios));
        this.setState({});
    }

    addPortfolio() {
        /* Method to add a new portfolio. There can be a maximum of 50 active portfolios. */
        if (this.portfolios.length >= 10) {
            alert("The maximum number of portfolios has been reached.\nPlease delete an existing portfolio before creating a new one.");
            return;
        }
        /* The user id prompted for a name for the portfolio. Empty strings and duplicate names are allowed, but if the
         * user presses the cancel-button no portfolio is created. */
        let name = prompt("Please enter a name for the new portfolio.");
        // eslint-disable-next-line
        if (name == undefined) return;
        this.portfolios.push(new Portfolio(this.counter, name));

        /* Update counter and save portfolios to local storage */
        this.counter += 1;
        this.saveState();
    }

    updateValues() {
        /* Method that initiates updating of stock values and value of the portfolio. This is done asynchronously so
        * that the user can continue working even if the update happens to take a long time. */
        this.portfolios.forEach(async portfolio => {
            /* If the server has returned a message about exceeded calls within the last 61 seconds, notify the user once
            * and don't send new requests to the server. */
            if ("requestLimit" in sessionStorage && sessionStorage.getItem("requestLimit") > Date.now() - 61000) {
                alert("The maximum number of requests per minute has been reached, please wait a moment and try again.");
                return;
            }
            let newValue = 0;
            for (let i = 0; i < portfolio.entries.length; i++) {
                let result = await StockServerData.getCurrentStockValue(this, portfolio.entries[i].symbol);
                if (result !== 200) {
                    /* Notify the user if something went wrong (except for exceeded request numbers, which are handled
                    elsewhere.) */
                    alert("Status " + result + ": Could not fetch all stock values, please try again later.");
                    return result;
                }
                newValue += portfolio.entries[i].totalValue;
            }
            /* Update portfolio value and DOM after each successful server request */
            portfolio.value = newValue;
            this.saveState();
        });
    }

    updateForex() {
        /* Method to initiate updating of the currency exchange rate */
        StockServerData.getCurrentForex(this);
    }

    render() {
        /*  Rendering of the app; "TopBar" is the global menu and "PortfolioView" renders the portfolios. */
        const AppMainDiv = styled.div`
            width: 100%;
            margin-top: 30px;
            display: flex;
            flex-direction: column;
            align-items: center;
        `;

        return (
            <AppMainDiv>
                <TopBar caller={this}/>
                <PortfolioView portfolios={this.portfolios} saveState={this.saveState.bind(this)} />
            </AppMainDiv>
        );
    }
}