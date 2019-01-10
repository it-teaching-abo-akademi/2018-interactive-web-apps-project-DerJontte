/*  The main menu for the app. Displays the current exchange rates as well. */

import React, {Component} from "react";
import styled from "styled-components";
import Currency from "./Currency";

export default class TopBar extends Component {

    render() {
        const Button = styled.button`
            width: 148px;
            margin-bottom: 10px;
        `;

        const TopBar = styled.div`
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: calc(100vw - 70px);
            max-width: 1330px;
            @media screen and (max-width: 1024px) {
                width: calc(100% - 35px);
                max-width: 650px;
            }
            @media screen and (max-width: 360px) {
                flex-direction: column;
                align-items: center;
            }
        `;

        const ButtonContainer = styled.div`
            @media screen and (max-width: 360px) {
            width: 150px;
        `;

        const CurrencyTable = styled.div`
            display: table-cell;
            min-width: 150px;
            max-height: 48px;
            text-align: right;
            @media screen and (max-width: 360px) {
                width: 150px;
                text-align: center;
            }
        `;

        return (
            <TopBar>
                <ButtonContainer>
                    <Button onClick={this.props.caller.addPortfolio.bind(this.props.caller)}>Create New Portfolio</Button>
                    <Button onClick={this.props.caller.updateValues.bind(this.props.caller)}>Update stock values</Button>
                    <Button onClick={this.props.caller.updateForex.bind(this.props.caller)}>Update exchange rate</Button>
                </ButtonContainer>
                <CurrencyTable>
                    1 EUR = {Currency.EtoD()} USD<br/>
                    1 USD = {Currency.DtoE()} EUR
                </CurrencyTable>
            </TopBar>
        )
    }
}

