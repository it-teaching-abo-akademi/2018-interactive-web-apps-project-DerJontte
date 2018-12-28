import React, {Component} from "react";
import {StockEntry} from "./DataTypes";
import "./PortfolioView.css";


export default class PortfolioView extends Component {
    constructor(props){
        super(props);
        this.saveState = props.saveState;
        this.portfolios = props.portfolios;
        this.highlighted = false;
    }

    addStock(portfolio) {
        let entry = new StockEntry("NOK", 3.3, 20);
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

    deletePortfolio(idx) {
        for (let i = 0; i < this.portfolios.length; i++) {
            // eslint-disable-next-line
            if (this.portfolios[i] == (undefined || null)) continue;
            if (this.portfolios[i].id === idx) {
                this.portfolios.splice(i, 1);
            }
        }
        this.saveState();
    }

    setSelected(portfolio, i) {
        portfolio.selected = i;
        this.setState({});
    }

    createStockList(portfolio) {
        let stockList = portfolio.entries;
        let toReturn = [];

        for(let i = 0; i < stockList.length; i++) {
            if(stockList[i] == null) continue;
            toReturn.push(
                <tr class="inner-col-10" onClick={this.setSelected.bind(this, portfolio, i)}>
                    <td class="inner-col-2">{stockList[i].symbol}</td>
                    <td class="inner-col-2">{stockList[i].value}</td>
                    <td class="inner-col-2">{stockList[i].amount}</td>
                    <td class="inner-col-2">{stockList[i].totalValue}</td>
                    <td class="inner-col-2"><input type="radio" name={"selection" + portfolio.id} value={i} checked={portfolio.selected === i}/></td>
                </tr>
            )
        }
        return(
            <table>
                <thead>
                <tr>
                    <td class="inner-col-2">Name</td>
                    <td class="inner-col-2">Unit value</td>
                    <td class="inner-col-2">Quantity</td>
                    <td class="inner-col-2">Total value</td>
                    <td class="inner-col-2">Select</td>
                </tr>
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
                <div class="portfolio_view_main col-3">
                    <div className="inner-col-10 portfolio_view_titlebar">
                        <div className="inner-col-1 placeholder"/>
                        <div className="inner-col-8">
                            {currentPortfolio.name}
                        </div>
                        <div className="portfolio_close_button" id={"button" + uniqueID } onMouseOver={this.highlight.bind(this, uniqueID)} onMouseLeave={this.highlight.bind(this, uniqueID)} onClick={deletePortfolio}>
                            X
                        </div>
                    </div>

                    {this.createStockList(currentPortfolio)}

                    <div id="bottom_bar" className="inner-col-10 portfolio_view_bottom_bar">
                        <div className="inner-col-10">
                            Total value of {currentPortfolio.name} : {currentPortfolio.value}
                        </div>
                        <div className="inner-col-7">
                            <button id="btn_add_stock" onClick={this.addStock.bind(this, currentPortfolio)}>Add stock</button>
                            <button id="btn_performance">Performance graph</button>
                        </div>
                        <div className="inner-col-3">
                            <button onClick={this.removeStock.bind(this, currentPortfolio)}>Remove selected</button>
                        </div>
                    </div>
                </div>
            )
        }

        return toReturn;
    }
}