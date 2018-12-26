import React, {Component} from "react";
import {Portfolio, StockEntry} from "./DataTypes";
import "./PortfolioView.css";
import App from "./App";

const InstanceContext = React.createContext();

export default class PortfolioView extends Component {
    constructor(props){
        super(props);
        this.portfolios = props.portfolios;
        this.close = props.delete_portfolio;
        this.state = {selected: ''}
    }

    setSelected(idx) {
        this.selected = idx;
    }

    addStock(portfolio, entry) {
        portfolio.addStock(entry);
        this.setState({});
    }

    removeStock(portfolio, amount) {
        portfolio.removeStock(this.selected, amount);
        this.setState({});
    }

    render() {
        var toReturn = [];
        var style = {
            border: "1px solid black",
        }

        for(let i = 0; i < this.portfolios.length; i++) {
            let currentPortfolio = this.portfolios[i];
            if (currentPortfolio != null) {
                let context = {
                    this: this,
                    portfolio: currentPortfolio,
                    state: this.state,
                    id: currentPortfolio.id,
                    close: this.close.bind(this, currentPortfolio.id),
                    name: currentPortfolio.name,
                    entries: currentPortfolio.entries,
                    value: currentPortfolio.value,
                    setSelected: this.setSelected.bind(this),
                    removeStock: this.removeStock,
                    addStock: this.addStock,
                };
                let bottomContext = {
                    addStock: this.addStock.bind(this, currentPortfolio),
                    removeStock: this.removeStock.bind(this, currentPortfolio),
                };
                toReturn.push(
                    <div class="portfolio_view_main col-5">
                        <InstanceContext.Provider value={context}>
                            <TitleBar />
                            <MainContent/>
                            <BottomBar context={bottomContext}/>
                        </InstanceContext.Provider>
                    </div>
                )
            }
        }

        return toReturn;
    }
}

class TitleBar extends Component {
    static contextType = InstanceContext;

    constructor(props){
        super(props);
        this.highlighted = false;
    }

    highlight() {
        let button = document.getElementById("button" + this.context.id).style;
        button.backgroundColor = this.highlighted ? "darkred" : "firebrick";
        this.highlighted = !this.highlighted;
    }


    render() {
        return(
            <div className="inner-col-10 portfolio_view_titlebar">
                <div className="inner-col-1 placeholder"/>
                <div className="inner-col-8">
                    {this.context.name} {this.context.id}
                </div>
                <div className="portfolio_close_button" id={"button" + this.context.id} onMouseOver={this.highlight.bind(this)} onMouseLeave={this.highlight.bind(this)} onClick={this.context.close}>
                    X
                </div>
            </div>
        )
    }
}

class MainContent extends Component {
    static contextType = InstanceContext;

    constructor(props){
        super(props);
        this.state = {selected: ''};
    }

    setSelected(idx){
        this.setState(
            {selected: idx}
        );
        this.context.setSelected(idx);
    }

    componentDidMount(){
    }

    render() {
        let stockList = this.context.entries;
        let toReturn = [];
        for(let i = 0; i < stockList.length; i++) {
            if(stockList[i] != null) {
                toReturn.push(
                    <tr class="inner-col-10" onClick={this.setSelected.bind(this, i)}>
                        <td class="inner-col-2">{stockList[i].symbol}</td>
                        <td class="inner-col-2">{stockList[i].value}</td>
                        <td class="inner-col-2">{stockList[i].amount}</td>
                        <td class="inner-col-2">{stockList[i].totalValue}</td>
                        <td class="inner-col-2"><input type="radio" name={"selection" + this.context.id} value={i} checked={this.state.selected === i}/></td>
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
}

class BottomBar extends Component {
    static contextType = InstanceContext;

    constructor(props){
        super(props);
        this.props = props;
    }

    addStock() {
        let entry = new StockEntry("NOK",3.5, 200);
        this.props.context.addStock(entry);
    }

    removeStock() {
        let amount = prompt("amount");
        this.props.context.removeStock(amount);
    }

    render() {
        return(
            <div id="bottom_bar" className="inner-col-10 portfolio_view_bottom_bar">
                <div className="inner-col-10">
                    Total value of {this.context.name} : {this.context.value}
                </div>
                <div className="inner-col-8">
                    <button id="btn_add_stock" onClick={this.addStock.bind(this)}>Add stock</button>
                    <button id="btn_performance">Performance graph</button>
                </div>
                <div className="inner-col-2">
                    <button className="float_right" onClick={this.removeStock.bind(this)}>Remove selected</button>
                </div>
            </div>
        )
    }
}
