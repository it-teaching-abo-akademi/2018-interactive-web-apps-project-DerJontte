import React, {Component} from "react";
import {Chart} from "chart.js";
import StockServerData from "./StockServerData";
import BusyOverlay from "./BusyOverlay";
import "./PerfGraph.css";

export default class PerfGraph extends Component {
    constructor(props) {
        super(props);
        this.saveState = props.saveState;
        this.symbol = props.symbol;
    }

    static parseData(symbol = this.symbol) {
        let startDate = document.getElementById("startDate").value;
        let endDate = document.getElementById("endDate").value;

        if (startDate == '') startDate = 0;
        if (endDate == '') endDate = 9;

        let returnDates = [], returnValues = [];
        symbol += "History";
        let JSONData = JSON.parse(localStorage.getItem(symbol))["value"];
        let dates = Object.keys(JSONData).sort();
        dates.forEach(date => {
            if (date.localeCompare(startDate) > 0 && date.localeCompare(endDate) < 0) {
                returnValues.push(JSONData[date]["4. close"]);
                returnDates.push(date);
            }
        });
        return {dates: returnDates, values: returnValues};
    }

    static createChart(chartData, symbol) {
        let ctx = document.getElementById("canvas");
        if (this.perfChart != null) this.perfChart.destroy();

        let label = "Stock: " + symbol + "     Currency: USD";
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
                legend: {
                    labels: {
                        boxWidth: 0
                    },
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });

        let minDate = chartData.dates[0];
        let maxDate = chartData.dates[chartData.dates.length - 1];
        let startPicker = document.getElementById("startDate");
        let endPicker = document.getElementById("endDate");
        let closeButton = document.getElementById("closeButton");

        startPicker.value = minDate;
        startPicker.min = minDate;
        startPicker.max = maxDate;

        endPicker.value = maxDate;
        endPicker.min = minDate;
        endPicker.max = maxDate;

        startPicker.addEventListener("change", evt => {
            PerfGraph.redrawChart(symbol);
        });

        endPicker.addEventListener("change", evt => {
            PerfGraph.redrawChart(symbol);
        });

        closeButton.addEventListener("click", evt => {
            localStorage.removeItem(symbol + "History");
        });

    }

    static redrawChart(symbol) {
        let newData = PerfGraph.parseData(symbol);
        this.perfChart.data.labels = newData.dates;
        this.perfChart.data.datasets[0].data = newData.values
        this.perfChart.update(0);
    }

    static async createGraph(whoCalled, symbol) {
        if (symbol == undefined) return;

        let chartDiv = document.getElementById("chart_div").style;
        document.body.style.overflow = "hidden";

        BusyOverlay.set();
        let response = await StockServerData.getStockHistory(whoCalled, symbol);
        BusyOverlay.unset();

        if (response != 200) {
            alert("Could not fetch stock history, please try again later");
            return;
        }

        let chartData = PerfGraph.parseData(symbol);

        chartDiv.visibility = "visible";

        PerfGraph.createChart(chartData, symbol);
    }

    static closeChart() {
        document.getElementById("chart_div").style.visibility = "hidden";
        document.body.style.overflow = "auto";
    }

    render() {
        return(
            <div id="chart_div">
                <div id="chart">
                    <canvas id="canvas"></canvas>
                    <div class="chart_controls">
                        <div class="chart_date">
                            <label for="startDate">Start date: </label>
                            <input id="startDate" type="date" min={null} max={null} value={null}/>
                        </div>
                        <div className="chart_date">
                            <label for="endDate">End date: &nbsp;&nbsp;</label>
                            <input id="endDate" type="date" min={null} max={null} value={null}/>
                        </div>
                        <div className="chart_close_container">
                            <button id="closeButton" class="float-right" onClick={PerfGraph.closeChart.bind(this)}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
