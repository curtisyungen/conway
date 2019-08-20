import React, { Component } from "react";
import "./cell.css";

class Cell extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            row: null,
            col: null,
            val: null,
        }
    }

    componentDidMount = () => {
        this.setState({
            row: this.props.row,
            col: this.props.col,
            val: this.props.val,
        });
    }

    toggleCell = () => {
        this.setState({
            val: !this.state.val,
        }, () => {
            this.updateBoard();
        });
    }

    updateBoard = () => {
        this.props.updateBoard(this.state.row, this.state.col, this.state.val);
    }

    render() { 
        return (
            <div className={`cell fill-${this.state.val} cell-${this.props.theme}`} onClick={this.toggleCell}></div>       
        )
    }
}

export default Cell;