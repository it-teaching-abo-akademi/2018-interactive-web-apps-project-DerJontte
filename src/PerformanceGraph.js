/* This class renders the overlay with a chart presenting the historical data of a given stock. */

import React, {Component} from "react";
import styled from "styled-components";
import {Chart} from "chart.js";
import StockServerData from "./StockServerData";
import BusyOverlay from "./BusyOverlay";

export default class PerformanceGraph extends Component {
    static async createChartWindow(whoCalled, symbol) {
        /* This is the main method that is called upon to show the stock performance chart. */
        if (symbol === undefined) return;

        /* Disable scrolling of the underlying main layer of the app. According to documentation, this disables the ability
         * to scroll the chart div as well on Apple Safari and related browsers, but since this app (and the chart div
         * with it) is designed to rescale all the way down to a width of 200px, that should not be a problem in practice. */
        document.body.style.overflow = "hidden";

        BusyOverlay.set(); // Show the BusyOverlay while getting data from the server so that the user knows the app hasn't frozen.
        let response = await StockServerData.getStockHistory(whoCalled, symbol);
        BusyOverlay.unset(); // Hide the BusyOverlay.

        if (response !== 200) {
            // If something went wrong...
            alert("Could not fetch stock history, please try again later");
            return;
        }

        let chartData = PerformanceGraph.parseData(symbol);

        // Show the div with the graph
        let chartDiv = document.getElementById("graph_overlay").style;
        chartDiv.visibility = "visible";

        // Draw the graph in the div
        PerformanceGraph.createChart(chartData, symbol);
    }

    static parseData(symbol) {
        /* Method that reads the historical data of a stock from localStorage, sorts it chronologically and returns
         * the values between the starting and ending dates that are chosen in the date pickers in the overlay.
          * If no dates are given, the entire available history for the stock is returned. */

        let startDate = document.getElementById("startDate").value;
        let endDate = document.getElementById("endDate").value;

        if (startDate === '') startDate = 0;
        if (endDate === '') endDate = 9;

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
        /* Method that creates the actual graph of the stock value development. After the graph is created, the values in
        the date pickers are set to their correct values and listeners for changes in the date pickers and the close
        button are created. */
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
            PerformanceGraph.redrawChart(symbol);
        });

        endPicker.addEventListener("change", evt => {
            PerformanceGraph.redrawChart(symbol);
        });

        closeButton.addEventListener("click", evt => {
            localStorage.removeItem(symbol + "History");
            PerformanceGraph.closeChart();
        });

    }

    static redrawChart(symbol) {
        /* The method that is called when the user changes the dates in the date pickers. */
        let newData = PerformanceGraph.parseData(symbol); // Parse the data between the new dates chosen
        this.perfChart.data.labels = newData.dates; // Set the new values for the x-axis
        this.perfChart.data.datasets[0].data = newData.values // Set the new values for the dataset
        this.perfChart.update(0); // Redraw the chart.
    }

    static closeChart() {
        /* Hide the chart and restore the ability to scroll the main layer of the app when needed */
        document.getElementById("graph_overlay").style.visibility = "hidden";
        document.body.style.overflow = "auto";
    }

    render() {
        const GraphOverlay = styled.div.attrs({
            id: "graph_overlay",
        })`{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.3);
            z-index: 1;
            visibility: hidden;
        `;

        const ChartDialog = styled.div`
            position: absolute;
            width: 60%;
            min-width: 650px;
            top: 5%;
            left: 50%;
            transform: translate(-50%, -3%);
            padding: 10px 10px 15px 15px;
            border: 2px solid black;
            background-color: white;
            font-family: monospace;
            @media screen and (max-width: 720px) {
                width: 90%;
                min-width: 215px;
            }
            @media screen and (max-height: 340px) {
                flex-direction: column;
                overflow: scroll;
                max-height: 95%;
            }
        `;

        const ChartControls = styled.div`
            display: flex;
            @media screen and (max-width: 660px) {
                {
                    display: initial;
                }
        `;

        const DateContainer = styled.div`
            float: left;
            width: 40%;
            @media screen and (max-width: 660px) {
                width: 60%;
            }
        `;

        const DateInput = styled.input.attrs({
            type: "date",
        })`
            margin-right: 10px;
        `;

        const CloseButton = styled.button.attrs({
            id: "closeButton",
        })`
            float: right;
            align-self: flex-end;
            flex-grow: 1;
        `;

        return(
            <GraphOverlay>
                <ChartDialog>
                    <canvas id="canvas"></canvas>
                    <ChartControls>
                        <DateContainer>
                            Start date: <DateInput id="startDate" />
                        </DateContainer>
                        <DateContainer>
                            End date: &nbsp;&nbsp;<DateInput id="endDate" />
                        </DateContainer>
                        <CloseButton>Close</CloseButton>
                    </ChartControls>
                </ChartDialog>
            </GraphOverlay>
        )
    }
}
