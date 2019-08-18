import React, { Component } from "react";
import Row from "../Row/row";
import "./board.css";

class Board extends Component {

    constructor(props) {
        super(props);

        this.state = {
            height: null,
            width: null,
            board: null,
            numRows: null,
            numCols: null,
        }
    }

    componentDidMount = () => {
        this.setState({
            numRows: 10,
            numCols: 10,
        }, () => {
            this.getCells();
        });
    }

    getCells = () => {

        let numRows = this.state.numRows;
        let numCols = this.state.numCols;

        let board = [];
        for (var i = 0; i < numRows; i++) {

            let row = [];
            for (var j = 0; j < numCols; j++) {
                let cell = {
                    row: i,
                    col: j,
                    val: j % 2 === 0,
                }

                row.push(cell);
            }

            board.push(row);
        }

        this.setState({
            board: board,
        }, () => {
            console.log("Board state", this.state);
        });
    }

    render() {
        return (
                this.state.board && this.state.board.length > 0 ? (
                    <div className="board">
                        {this.state.board.map(row => (
                            <Row
                                row={row}
                            />      
                        ))}
                    </div>
                ) : (
                    <></>
                )
        )
    }
}

export default Board;