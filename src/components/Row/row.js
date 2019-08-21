import React, { Component } from "react";
import Cell from "../Cell/cell";
// import "./cell.css";

class Row extends Component {
    render() {
        return (
            <div className="row">
                {this.props.row && this.props.row.length > 0 ? (
                    this.props.row.map(cell => (
                        <Cell 
                            key={`${cell.row}${cell.col}${cell.val}`}
                            row={cell.row}
                            col={cell.col}
                            val={cell.val}
                            updateBoard={this.props.updateBoard}
                            theme={this.props.theme}
                            timer={this.props.timer}
                        />
                    ))
                ) : (
                    <></>
                )}
            </div>
        )
    }
}

export default Row;