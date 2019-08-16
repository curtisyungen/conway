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
                    val: j % 2 === 0,
                }

                cells.push(cell);
            }
        }

        this.setState({
            cells: cells,
        }, () => {
            console.log("Board state", this.state);
        });
    }

    render() {
        return (
                this.state.cells && this.state.cells.length > 0 ? (
                    <div className="board">
                        {this.state.cells.map(cell => (
                            <Cell 
                                cell={cell}
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