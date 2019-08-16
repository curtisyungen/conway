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
            row: this.props.cell.row,
            col: this.props.cell.col,
            val: this.props.cell.val,
        });
    }

    toggleCell = () => {
        this.setState({
            val: !this.state.val,
        });
    }

    render() { 
        return (
            this.state.val ? (
                <div className={`cell fill-${this.state.cell.val}`} onClick={this.toggleCell}></div>     
            ) : (
                <></>
            )       
        )
    }
}

export default Cell;