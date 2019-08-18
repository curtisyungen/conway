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
        });
    }

    render() { 
        return (
            this.state.row ? (
                <div className={`cell fill-${this.state.val}`} onClick={this.toggleCell}></div>     
            ) : (
                <></>
            )       
        )
    }
}

export default Cell;