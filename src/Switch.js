import React, {Component} from "react";

export class Switch extends React.Component {
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

        var divStyle ={
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            alignItems: "center",
            flexGrow: 2,
        }

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
            <div style={divStyle}>
                {this.props.labelOff}
                <button style={buttonStyle} onClick={this.flip.bind(this)}/>
                {this.props.labelOn}
            </div>
        );
    }
}