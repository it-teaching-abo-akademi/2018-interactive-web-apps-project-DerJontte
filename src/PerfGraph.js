import React, { Component } from 'react';
import {Chart} from "chart.js";
import StockServerData from "./StockServerData";
import BusyOverlay from "./BusyOverlay";

export default class MyChart extends Component {
    constructor(props) {
        super(props);
        this.saveState = props.saveState;
        this.symbol = props.symbol;
    }

    static parseData(symbol = this.symbol) {
        let values = [];
        symbol += "History";
        let JSONData = JSON.parse(localStorage.getItem(symbol))["value"];
        let dates = Object.keys(JSONData).sort();
        dates.forEach(date => {
            values.push(JSONData[date]["4. close"]);
        });
        return {dates: dates, values: values};
    }

    static createChart(chartData, label) {
        let ctx = document.getElementById("chart");
        if (this.perfChart != null) this.perfChart.destroy();

        this.perfChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: chartData.dates,
                datasets: [{
                    label: label,
                    data: chartData.values,
                    borderColor: "rgba(255, 0, 0, 10)",
                    borderWidth: 1,
                    cubicInterpolationMode: 'monotone',
                    pointRadius: 0,
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
    }

    static async createGraph(whoCalled, symbol) {
        if (symbol == undefined) return;

        let chartDiv = document.getElementById("chart_div").style;
        if (chartDiv.visibility == "visible") {
            chartDiv.visibility = "hidden";
            return;
        }

        BusyOverlay.set();
        let response = await StockServerData.getStockHistory(whoCalled, symbol);
        BusyOverlay.unset();

        if (response != 200) {
            alert("Could not fetch stock history, please try again later");
            return;
        }

        let chartData = MyChart.parseData(symbol);
        chartDiv.visibility = "visible";

        MyChart.createChart(chartData, symbol);
    }

    render() {
        return null;
    }
}
