import React, {Component} from "react";
import {Chart} from "chart.js";
import {StockEntry} from "./DataTypes";
import {Currency} from "./Currency";
import StockServerData from "./StockServerData";
import PerfGraph from "./PerfGraph";
import "./styles.css";
import "./PortfolioView.css";

export default class PortfolioView extends Component {
    constructor(props){
        super(props);
        this.saveState = props.saveState;
        this.portfolios = props.portfolios;
        this.highlighted = false;
    }

    async addStock(portfolio) {
        if (portfolio.entries.length >= 50) {
            alert("The maximum number of stocks in the current portfolio has been reached.\nPlease delete an existing stock or select a different portfolio to continue.");
            return;
        }
        let value, amount;

        let symbol = prompt("Please enter stock symbol");
        if (!symbol) return;
        symbol = symbol.toUpperCase();

        let doConvert = true;
        if (symbol in localStorage) {
            doConvert = false;
            value = JSON.parse(localStorage.getItem(symbol))["value"];
        }

        while (!value || isNaN(value)) {
            value = prompt("Please enter value per share in " + portfolio.currency + ".\nEnter 0 to fetch the current value from AlphaVantage.");
            if (value === null) return;
            if (value == 0) {
                let response = await StockServerData.getCurrentStockValue(this, symbol);
                if (response == 200) {
                    value = JSON.parse(localStorage.getItem(symbol))["value"];
                } else {
                    localStorage.removeItem(symbol);
                    alert("Could not fetch stock value from server");
                    value = 0;
                }
            }
        }

        while (!amount || isNaN(amount) || amount % 1 != 0) {
            amount = prompt("Please enter the number of shares in the stock");
            if (amount === null) return;
        }
        if (portfolio.currency == "EUR" && doConvert) value = Currency.EtoD(value);
        let entry = new StockEntry(symbol, value, amount);
        portfolio.addStock(entry);
        this.saveState();
    }

    removeStock(portfolio) {
        let amount = prompt("Amount to remove");
        portfolio.removeStock(portfolio.selected, amount);
        this.saveState();
    }

    highlight(uniqueID) {
        let button = document.getElementById("button" + uniqueID).style;
        button.backgroundColor = this.highlighted ? "darkred" : "firebrick";
        this.highlighted = !this.highlighted;
    }

    deletePortfolio(removeID) {
        for (let i = 0; i < this.portfolios.length; i++) {
            // eslint-disable-next-line
            if (this.portfolios[i] == (undefined || null)) continue;
            if (this.portfolios[i].id === removeID) {
                // eslint-disable-next-line
                if (confirm("Do you want to delete the portfolio " + this.portfolios[i].name + "?")) {
                    this.portfolios.splice(i, 1);
                }
            }
        }
        this.saveState();
    }

    setSelected(portfolio, i) {
        portfolio.selected = i;
        this.saveState();
    }

    setCurrency(portfolio, currency) {
        portfolio.currency = currency;
        this.saveState();
    }

    async createGraph(portfolio) {
        if (portfolio.selected === '') return;
        let symbol = portfolio.entries[portfolio.selected].symbol;
        PerfGraph.createGraph(this, symbol);
    }

    createStockList(portfolio) {
        let stockList = portfolio.entries;
        let toReturn = [];

        for(let i = 0; i < stockList.length; i++) {
            if(stockList[i] == null) continue;
            let unitValue = portfolio.getCurrentValue(stockList[i]);
            let totalValue = portfolio.getCurrentRate(stockList[i].totalValue);
            toReturn.push(
                <tr class="inner-col-10" onClick={this.setSelected.bind(this, portfolio, i)}>
                    <td class="inner-col-2">{stockList[i].symbol}</td>
                    <td class="inner-col-2">{unitValue} {portfolio.currency}</td>
                    <td class="inner-col-2">{stockList[i].amount}</td>
                    <td class="inner-col-2">{totalValue} {portfolio.currency}</td>
                    <td class="inner-col-2"><input type="radio" name={"selection" + portfolio.id} checked={portfolio.selected === i}/></td>
                </tr>
            )
        }

        return (
            <table>
                <thead>
                <th>
                    <td class="inner-col-2">Name</td>
                    <td class="inner-col-2">Unit value</td>
                    <td class="inner-col-2">Quantity</td>
                    <td class="inner-col-2">Total value</td>
                    <td class="inner-col-2">Select</td>
                </th>
                </thead>
                <tbody class="inner-col-10">
                {toReturn}
                </tbody>
            </table>
        )
    }

    render() {
        var toReturn = [];

        for(let i = 0; i < this.portfolios.length; i++) {
            // eslint-disable-next-line
            if (this.portfolios[i] == (undefined || null)) continue;

            let currentPortfolio = this.portfolios[i];
            let deletePortfolio = this.deletePortfolio.bind(this, currentPortfolio.id);
            let uniqueID = "id" + currentPortfolio.id;

            toReturn.push(
                <div class="portfolio_container_flex">
                    <TitleBar currentPortfolio={currentPortfolio} uniqueID={uniqueID} deletePortfolio={deletePortfolio} highlight={this.highlight.bind(this, uniqueID)} saveState={this.saveState}/>
                    {this.createStockList(currentPortfolio)}
                    <BottomBar currentPortfolio={currentPortfolio} addStock={this.addStock.bind(this, currentPortfolio)} removeStock={this.removeStock.bind(this, currentPortfolio)} createGraph={this.createGraph.bind(this, currentPortfolio)}/>
                </div>
            )
        }
        return (
            <div class="portfolio_section">
                {toReturn}
            </div>
        )
    }
}


class TitleBar extends Component{
    constructor(props){
        super(props);
    }
    render() {
        return (
            <div className="titlebar_flex">
                <div class="titlebar_title">
                    {this.props.currentPortfolio.name}
                </div>
                <Switch labelOff="EUR" labelOn="USD" onChange={this.props.currentPortfolio.changeCurrency.bind(this.props.currentPortfolio)} saveState={this.props.saveState} on={this.props.currentPortfolio.currency == "EUR"}/>
                <div className="close_button_flex" id={"button" + this.props.uniqueID } onMouseOver={this.props.highlight} onMouseLeave={this.props.highlight} onClick={this.props.deletePortfolio}>
                    X
                </div>
            </div>
        )
    }
}


class BottomBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let currentPortfolio = this.props.currentPortfolio;
        return(
            <div className="bottom_bar_flex">
                <div id="text">
                        Total value of
                        portfolio : {currentPortfolio.getCurrentRate(currentPortfolio.value)} {currentPortfolio.currency}
                </div>
                <div className="inner-col-6">
                    <button id="btn_add_stock" onClick={this.props.addStock}>Add stock</button>
                    <button id="btn_performance" onClick={this.props.createGraph}>Performance graph</button>
                </div>
                <div className="inner-col-4">
                    <button className="float-right" onClick={this.props.removeStock}>Remove selected</button>
                </div>
            </div>
        )
    }
}

class Switch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            on: this.props.on,
        }
    }

    flip() {
        this.setState({on: !this.state.on});
        this.props.onChange();
        this.props.saveState();
    }

    render() {
        var leftBorder = 15 * this.state.on;
        var rightBorder = 15 * !this.state.on;

        var buttonStyle = {
            height: "15px",
            width: "30px",
            border: 0,
            padding: 0,
            margin: "5px",
            borderLeft: leftBorder + "px solid #D00",
            borderRight: rightBorder + "px solid #D00",
            outline: "none",
            borderRadius: "10px",
            backgroundColor: "#BBB"
        }
        return (
            <div class="switch_flex">
                {this.props.labelOff}
                <button style={buttonStyle} onClick={this.flip.bind(this)}/>
                {this.props.labelOn}
            </div>
        );
    }
}