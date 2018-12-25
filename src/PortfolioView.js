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

    render() {
        var toReturn = [];
        var style = {
            border: "1px solid black",
        }

        for(let i = 0; i < this.portfolios.length; i++) {
            if (this.portfolios[i] != null) {
                let context = {
                    state: this.state,
                    id: this.portfolios[i].id,
                    close: this.close.bind(this, this.portfolios[i].id),
                    name: this.portfolios[i].name,
                    entries: this.portfolios[i].entries,
                    value:this.portfolios[i].value
                };
                toReturn.push(
                    <div class="portfolio_view_main col-5">
                        <InstanceContext.Provider value={context}>
                            <TitleBar />
                            <MainContent/>
                            <BottomBar/>
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
        let normalColor = "darkred";
        let highlightColor = "firebrick";
        if (this.highlighted) {
            button.backgroundColor = normalColor;
            this.highlighted = !this.highlighted;
        } else {
            button.backgroundColor = highlightColor;
            this.highlighted = !this.highlighted;
        }
    }


    render() {
        return(
            <div className="inner-col-10 portfolio_view_titlebar">
                <div className="inner-col-1 placeholder"/>
                <div className="inner-col-8">
                    {this.context.name}
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
    }

    componentDidMount(){
    }
// TODO: fixa så att denhär sätter hela komponentens state så att det går att använda delete selected-knappen
    setSelected(newValue) {
        this.state.setState((state, props) => {
            return {selected: newValue};
        });
    }

    render() {
        this.state = this.context.state;

        let stockList = this.context.entries;
        let toReturn = [];
        let oddRow = true;
        for(let i = 0; i < stockList.length; i++) {
            toReturn.push(
                <tr class="inner-col-10" onClick={setSelected.bind(this, "selection" + this.context.id + i)}>
                    <td class="inner-col-2">{this.context.symbol}s {i}</td>
                    <td class="inner-col-2">{this.context.value}v</td>
                    <td class="inner-col-2">{this.context.number}q</td>
                    <td class="inner-col-2">{this.context.totalValue}tv</td>
                    <td class="inner-col-2"><input type="radio" name={"selection" + this.context.id} value={"selection" + this.context.id + i} checked={this.state.selected === "selection" + this.context.id + i}/></td>
                </tr>
            )
            oddRow = !oddRow;
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
    constructor(props){
        super(props);
        this.context = InstanceContext.Provider;
    }

    render() {
        return(
            <div id="bottom_bar" className="inner-col-10 portfolio_view_bottom_bar">
                <div className="inner-col-10">
                    Total value of {this.title} : {this.totalValue}
                </div>
                <div className="inner-col-8">
                    <button id="btn_add_stock" onClick={null}>Add stock</button>
                    <button id="btn_performance">Performance graph</button>
                </div>
                <div className="inner-col-2">
                    <button className="float_right" onClick={this.removeStock}>Remove selected</button>
                </div>
            </div>
        )
    }
}
