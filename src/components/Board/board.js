import React, { Component } from "react";
import Cell from "../Cell/cell";
import "./board.css";

class Board extends Component {

    constructor(props) {
        super(props);

        this.state = {
            height: null,
            width: null,
            cells: null,
        }
    }

    componentDidMount = () => {
        this.getCells();
    }

    getCells = () => {

        let cells = [];
        for (var i = 0; i < 10; i++) {
            for (var j = 0; j < 10; j++) {
                let cell = {
                    row: i,
                    col: j,
                    val: false,
                }
            }
        }

        this.setState({
            cells: cells,
        });
    }

    render() {
        return (
            <div className="board">
                {this.state.cells && this.state.cells.length > 0 ? (
                    this.state.cells.map(cell => (
                        <Cell 
                            cell={cell}
                        />
                    ))
                ) : (
                    <></>
                )}
            </div>
        )
    }
}

export default Board;