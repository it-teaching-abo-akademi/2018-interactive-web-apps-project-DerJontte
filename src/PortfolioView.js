import React, {Component} from "react";
import {Portfolio, StockEntry} from "./DataTypes";
import "./PortfolioView.css";
import App from "./App";

const InstanceContext = React.createContext();

export default class PortfolioView extends Component {
    constructor(props){
        super(props);
        this.saveState = props.saveState;
        this.portfolios = props.portfolios;
        this.highlighted = false;
        this.state = {selected: ''};
    }

    addStock(portfolio) {
        let entry = new StockEntry("NOK", 3.3, 20);
        portfolio.addStock(entry);
        this.saveState();
    }

    removeStock(portfolio) {
        let amount = prompt("Amount to remove");
        portfolio.removeStock(this.state.selected, amount);
        this.setState({});
    }

    highlight(uniqueID) {
        let button = document.getElementById("button" + uniqueID).style;
        button.backgroundColor = this.highlighted ? "darkred" : "firebrick";
        this.highlighted = !this.highlighted;
    }

    deletePortfolio(idx) {
        for (let i = 0; i < this.portfolios.length; i++) {
            if (this.portfolios[i] === undefined) continue;
            if (this.portfolios[i].id === idx) {
                delete this.portfolios[i];
            }
        }
        this.setState({});
        this.saveState();
    }

    setSelected(i) {
        this.setState({selected: i});
    }

    createStockList(portfolio) {
        let stockList = portfolio.entries;
        let toReturn = [];

        for(let i = 0; i < stockList.length; i++) {
            if(stockList[i] != null) {
                toReturn.push(
                    <tr class="inner-col-10" onClick={this.setSelected.bind(this, i)}>
                        <td class="inner-col-2">{stockList[i].symbol}</td>
                        <td class="inner-col-2">{stockList[i].value}</td>
                        <td class="inner-col-2">{stockList[i].amount}</td>
                        <td class="inner-col-2">{stockList[i].totalValue}</td>
                        <td class="inner-col-2"><input type="radio" name={"selection" + portfolio.id} value={i} checked={this.state.selected === i}/></td>
                    </tr>
                )
            }
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
                <tbody>
                {toReturn}
                </tbody>
            </table>
        )
    }

    render() {
        var toReturn = [];
        var style = {
            border: "1px solid black",
        }

        for(let i = 0; i < this.portfolios.length; i++) {
            if (this.portfolios[i] === undefined) continue;

            let currentPortfolio = this.portfolios[i];
            let deletePortfolio = this.deletePortfolio.bind(this, currentPortfolio.id)
            let uniqueID = "id" + currentPortfolio.id;

            toReturn.push(
                <div class="portfolio_view_main col-5">
                    <div className="inner-col-10 portfolio_view_titlebar">
                        <div className="inner-col-1 placeholder"/>
                        <div className="inner-col-8">
                            {currentPortfolio.name} {currentPortfolio.id}
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
                        <div className="inner-col-8">
                            <button id="btn_add_stock" onClick={this.addStock.bind(this, currentPortfolio)}>Add stock</button>
                            <button id="btn_performance">Performance graph</button>
                        </div>
                        <div className="inner-col-2">
                            <button className="float_right" onClick={this.removeStock.bind(this, currentPortfolio)}>Remove selected</button>
                        </div>
                    </div>
                </div>
            )
        }

        return toReturn;
    }
}

class MainContent extends Component {
    constructor(props){
        super(props);
        this.state = {selected: ''};
    }

    setSelected(idx){
        this.setState(
            {selected: idx}
        );
    }

    componentDidMount(){
    }

}