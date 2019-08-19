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

    componentWillUnmount = () => {
        clearInterval(this.state.interval);
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;

        this.setState({
            [name]: value,
        });
    }

    // Generates a new board
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
    startGame = (event) => {
        event.preventDefault();
        let interval = setInterval(this.getValues, 1000);

        this.setState({
            interval: interval,
        });
    }

    // Reads cell values from board
    // Runs Conway on each cell
    getValues = () => {
        console.log("get values");
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

                // Cell values
                let topLeft, topMid, topRight, midLeft, currVal, midRight, botLeft, botMid, botRight;

                if (prevRow >= 0 && prevCol >= 0) {
                    topLeft = board[prevRow][prevCol].val;
                }

                if (prevRow >= 0) {
                    topMid = board[prevRow][col].val;
                }

                if (prevRow >= 0 && nextCol < cols) {
                    topRight = board[prevRow][nextCol].val;
                }

                if (prevCol >= 0) {
                    midLeft = board[row][prevCol].val;
                }

                currVal = board[row][col].val;

                if (nextCol < cols) {
                    midRight = board[row][nextCol].val;
                }

                if (nextRow < rows && prevCol >= 0) {
                    botLeft = board[nextRow][prevCol].val;
                }

                if (nextRow < rows) {
                    botMid = board[nextRow][col].val;
                }

                if (nextRow < rows && nextCol < cols) {
                    botRight = board[nextRow][nextCol].val;
                }

                this.conway(row, col, currVal, [topLeft, topMid, topRight, midLeft, midRight, botLeft, botMid, botRight]);
            }
        }
    }

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
                <div className="board">
                    {this.state.board.map(row => (
                        <Row
                            key={Math.random() * 100000}
                            row={row}
                            updateBoard={this.updateBoard}
                        />
                    ))}

                    <form className="boardForm">
                        <div className="form-group">
                            <span>Rows</span>
                            <input
                                autoComplete="off"
                                name="numRows"
                                type="text"
                                className="form-control boardSize"
                                id="boardHeight"
                                onChange={this.handleInputChange}
                                defaultValue={10}
                            />
                        </div>
                        <div className="form-group">
                            <span>Col</span>
                            <input
                                autoComplete="off"
                                name="numCols"
                                type="text"
                                className="form-control boardSize"
                                id="boardWidth"
                                onChange={this.handleInputChange}
                                defaultValue={10}
                            />
                        </div>
                    </form>

                    <button
                        className="btn btn-primary startBtn formBtn"
                        onClick={this.startGame}
                    >
                        Start
                    </button>
                    <button
                        className="btn btn-success formBtn"
                        onClick={(event) => { event.preventDefault(); this.getCells(); }}
                    >
                        Update
                    </button>
                    <button
                        className="btn btn-danger formBtn"
                        onClick={(event) => { event.preventDefault(); this.getCells(); }}
                    >
                        Clear
                    </button>
                </div>
            ) : (
                    <></>
                )
        )
    }
}

export default Board;