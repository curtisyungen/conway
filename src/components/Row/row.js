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
                            row={cell.row}
                            col={cell.col}
                            val={cell.val}
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