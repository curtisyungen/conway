import React, { Component } from "react";
import Row from "../Row/row";
import "./board.css";

class Board extends Component {

    constructor(props) {
        super(props);

        this.state = {
            board: null,
            nextBoard: null,
            numRows: null,
            numCols: null,
            interval: null,
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

    // Handles changes to input form (rows & columns)
    handleInputChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        });
    }

    setSize = (height, width) => {
        this.setState({
            height: height,
            width: width,
        }, () => {
            this.getCells();
        });
    }

    // Generates a new board of all empty cells
    getCells = () => {
        let numRows = parseInt(this.state.numRows);
        let numCols = parseInt(this.state.numCols);

        let board = [];
        for (var i = 0; i < numRows; i++) {

            let row = [];
            for (var j = 0; j < numCols; j++) {
                let cell = {
                    row: i,
                    col: j,
                    val: false,
                }

                row.push(cell);
            }
            board.push(row);
        }

        this.setState({
            board: board,
        }, () => {
            this.resetNextBoard();
        });
    }

    getRandom = () => {
        alert("Button not yet operable.");
    }

    // Resets the next frame board to all blank cells
    resetNextBoard = () => {
        let numRows = parseInt(this.state.numRows);
        let numCols = parseInt(this.state.numCols);

        let nextBoard = [];
        for (var i = 0; i < numRows; i++) {
            let nRow = [];
            for (var j = 0; j < numCols; j++) {
                let nCell = {
                    row: i,
                    col: j,
                    val: false,
                }

                nRow.push(nCell);
            }

            nextBoard.push(nRow);
        }

        this.setState({
            nextBoard: nextBoard,
        });

        // Get number of live cells on board
        let board = this.state.board;
        let count = 0;
        for (var r in board) {
            for (var c in board) {
                if (board[r][c].val === true) {
                    count += 1;
                }
            }
        }

        if (count === 0) {
            clearInterval(this.state.interval);
        }
    }

    // Updates a cell's value when clicked
    updateBoard = (row, col, val) => {
        let board = this.state.board;

        board[row][col].val = val;

        this.setState({
            board: board,
        });
    }

    // Called when Start button is clicked
    startInterval = (event) => {
        event.preventDefault();
        let interval = setInterval(this.getValues(), 1000);

        this.setState({
            interval: interval,
        });
    }

    // Called when the Prev button is clicked
    prevFrame = (event) => {
        event.preventDefault();
        alert("Button not yet operable.");
    }

    // Called when Next button is clicked
    nextFrame = (event) => {
        event.preventDefault();
        this.getValues();
    }

    // Reads cell values from board
    // Runs Conway on each cell
    getValues = () => {
        let board = this.state.board;

        let row, col;
        for (row = 0; row < board.length; row++) {
            for (col = 0; col < board[row].length; col++) {

                // Number of rows and columns on board
                let rows = parseInt(this.state.numRows);
                let cols = parseInt(this.state.numCols);

                // Previous and next rows
                let prevRow = row - 1;
                let nextRow = row + 1;

                // Previous and next columns
                let prevCol = col - 1;
                let nextCol = col + 1;

                // Cell values in 3x3 grid with current cell in center
                let topLeft, topMid, topRight, midLeft, currVal, midRight, botLeft, botMid, botRight;

                // Top left
                if (prevRow >= 0 && prevCol >= 0) {
                    topLeft = board[prevRow][prevCol].val;
                }

                // Top mid
                if (prevRow >= 0) {
                    topMid = board[prevRow][col].val;
                }

                // Top right
                if (prevRow >= 0 && nextCol < cols) {
                    topRight = board[prevRow][nextCol].val;
                }

                // Mid left
                if (prevCol >= 0) {
                    midLeft = board[row][prevCol].val;
                }

                // Mid center (current)
                currVal = board[row][col].val;

                // Mid right
                if (nextCol < cols) {
                    midRight = board[row][nextCol].val;
                }

                // Bottom left
                if (nextRow < rows && prevCol >= 0) {
                    botLeft = board[nextRow][prevCol].val;
                }

                // Bottom mid
                if (nextRow < rows) {
                    botMid = board[nextRow][col].val;
                }

                // Bottom right
                if (nextRow < rows && nextCol < cols) {
                    botRight = board[nextRow][nextCol].val;
                }

                this.conway(row, col, currVal, [topLeft, topMid, topRight, midLeft, midRight, botLeft, botMid, botRight]);
            }
        }
    }

    // Applies the Conway algorithm to each cell to determine if it will live or die
    conway = (row, col, currVal, valArray) => {

        let result;

        // Any live cell with fewer than two live neighbors dies
        // Any live cell with two or three live neighbors lives
        // Any live cell with more than three live neighbors dies
        if (currVal) {
            let count = 0;
            for (let v in valArray) {
                if (valArray[v] === true) {
                    count += 1;
                }
            }

            result = true;
            if (count < 2 || count > 3) {
                result = false;
            }
        }
        // Any dead cell with exactly three live neighbors becomes a live cell
        else {
            let count = 0;

            for (let v in valArray) {
                if (valArray[v] === true) {
                    count += 1;
                }
            }

            result = false;
            if (count === 3) {
                result = true;
            }
        }

        let nextBoard = this.state.nextBoard;
        nextBoard[row][col].val = result;

        this.setState({
            board: nextBoard,
        }, () => {
            this.resetNextBoard();
        });
    }

    render() {
        return (
            this.state.board && this.state.board.length > 0 ? (
                <div className="main">

                    {/* BOARD */}

                    <div className="board">
                        {this.state.board.map(row => (
                            <Row
                                key={Math.random() * 100000}
                                row={row}
                                updateBoard={this.updateBoard}
                            />
                        ))}
                    </div>

                    {/* ROW & COL ADJUSTMENT */}

                    <form className="boardForm">
                        <div className="form-group group-inline-block">
                            <span>Rows</span>
                            <input
                                autoComplete="off"
                                name="numRows"
                                type="text"
                                className="form-control boardSize"
                                id="boardHeight"
                                onChange={this.handleInputChange}
                                defaultValue={10}
                                max={25}
                            />
                        </div>
                        <div className="form-group group-inline-block">
                            <span>Col</span>
                            <input
                                autoComplete="off"
                                name="numCols"
                                type="text"
                                className="form-control boardSize"
                                id="boardWidth"
                                onChange={this.handleInputChange}
                                defaultValue={10}
                                max={25}
                            />
                        </div>
                    </form>

                    {/* CONTROL BUTTONS */}

                    <div className="formBtns">
                        <button
                            className="btn btn-dark btn-sm formBtn"
                            onClick={this.prevFrame}
                        >
                            Prev
                        </button>
                        <button
                            className="btn btn-primary btn-sm startBtn formBtn"
                            onClick={this.startInterval}
                        >
                            Start
                        </button>
                        <button
                            className="btn btn-dark btn-sm formBtn"
                            onClick={this.nextFrame}
                        >
                            Next
                        </button>
                        <button
                            className="btn btn-danger btn-sm formBtn"
                            onClick={(event) => { event.preventDefault(); this.getCells(); }}
                        >
                            Clear
                        </button>
                        <button
                            className="btn btn-danger btn-sm formBtn"
                            onClick={(event) => { event.preventDefault(); this.getRandom(); }}
                        >
                            Random
                        </button>
                        <button
                            className="btn btn-danger btn-sm formBtn"
                            onClick={(event) => {event.preventDefault(); this.setSize(3, 3);}}
                        >
                            Small
                        </button>
                        <button
                            className="btn btn-danger btn-sm formBtn"
                            onClick={(event) => {event.preventDefault(); this.setSize(10, 10);}}
                        >
                            Medium
                        </button>
                        <button
                            className="btn btn-danger btn-sm formBtn"
                            onClick={(event) => {event.preventDefault(); this.setSize(25, 25);}}
                        >
                            Large
                        </button>
                    </div>
                </div>
            ) : (
                    <></>
                )
        )
    }
}

export default Board;