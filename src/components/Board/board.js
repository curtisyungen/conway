import React, { Component } from "react";
import Row from "../Row/row";
import "./board.css";

import getPatterns from "../../utils/patterns";

const DEFAULT_SPEED = 250;
const DEFAULT_SIZE = 25;
const DEFAULT_THEME = "light";
const FAST = 250;
const MED = 500;
const SLOW = 1000;

class Board extends Component {

    constructor(props) {
        super(props);

        this.state = {
            board: null,
            nextBoard: null,
            numRows: null,
            numCols: null,
            timer: null,
            count: 0,
            speed: null,
            theme: null,
        }
    }

    componentDidMount = () => {

        this.setState({
            numRows: DEFAULT_SIZE,
            numCols: DEFAULT_SIZE,
            speed: DEFAULT_SPEED,
            theme: DEFAULT_THEME,
        }, () => {
            this.getCells();
        });
    }

    componentDidUpdate = (prevState) => {
        if (this.state.timer && JSON.stringify(prevState.board) === JSON.stringify(this.state.nextBoard)) {
            this.stopInterval();
        }
    }

    componentWillUnmount = () => {
        clearInterval(this.state.timer);
    }

    setSize = (rows, cols) => {
        this.setState({
            numRows: rows,
            numCols: cols,
        }, () => {
            this.getCells();
        });
    }

    setSpeed = (speed) => {
        this.setState({
            speed: speed,
        });
    }

    setTheme = (theme) => {
        this.setState({
            theme: theme,
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
            counter: 0,
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
    }

    // Updates a cell's value when clicked
    updateBoard = (row, col, val) => {
        let board = this.state.board;

        board[row][col].val = val;

        this.setState({
            board: board,
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

    // Called when Start button is clicked
    startInterval = (event) => {
        event.preventDefault();

        let count = 0;

        this.setState({
            count: count,
        });

        let timer = setInterval(() => {
            let count = this.state.count;
            count = this.state.count + 1;

            this.setState({
                count: count,
            }, () => {
                this.getValues();
            });
        }, this.state.speed);

        this.setState({
            timer: timer,
        });
    }

    stopInterval = (event) => {
        clearInterval(this.state.timer);

        this.setState({
            timer: null,
        });
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

    getPattern = (pattern) => {
        let board;

        switch(pattern) {
            case "1": board = getPatterns.getPattern1(); break;
            case "2": board = getPatterns.getPattern2(); break;
            case "3": board = getPatterns.getPattern3(); break;
            case "4": board = getPatterns.getPattern4(); break;
            default: board = getPatterns.getPattern1();
        }

        this.setState({
            board: board,
        });
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
                <div className={`main`}>

                    {/* BOARD */}
                    <div className={`board board-${this.state.theme}`}>
                        {this.state.board.map(row => (
                            <Row
                                key={Math.random() * 100000}
                                row={row}
                                updateBoard={this.updateBoard}
                                theme={this.state.theme}
                            />
                        ))}
                    </div>

                    {/* CONTROL BAR */}
                    <div className="controlBar">

                        {/* COUNTER */}
                        <div className="counter">
                            {this.state.count}
                        </div>

                        <div className="buttonSet1">

                            {/* CONTROL BUTTONS */}
                            <button
                                className="btn btn-dark btn-sm formBtn"
                                onClick={this.prevFrame}
                            >
                                Prev
                            </button>

                            {this.state.timer ? (
                                <button
                                    className="btn btn-danger btn-sm stopBtn formBtn"
                                    onClick={this.stopInterval}
                                >
                                    Stop
                                </button>
                            ) : (
                                <button
                                    className="btn btn-success btn-sm startBtn formBtn"
                                    onClick={this.startInterval}
                                >
                                    Start
                                </button>
                            )}

                            <button
                                className="btn btn-dark btn-sm formBtn"
                                onClick={this.nextFrame}
                            >
                                Next
                            </button>

                            {/* SIZE BUTTONS */}
                            {/* <button
                                className={`btn btn-outline-dark btn-sm formBtn size-${this.state.numRows === 3}`}
                                onClick={(event) => { event.preventDefault(); this.setSize(3, 3); }}
                            >
                                Small
                            </button>
                            <button
                                className={`btn btn-outline-dark btn-sm formBtn size-${this.state.numRows === 10}`}
                                onClick={(event) => { event.preventDefault(); this.setSize(10, 10); }}
                            >
                                Medium
                            </button>
                            <button
                                className={`btn btn-outline-dark btn-sm formBtn size-${this.state.numRows === 25}`}
                                onClick={(event) => { event.preventDefault(); this.setSize(25, 25); }}
                            >
                                Large
                            </button> */}
                        </div>

                        <div className="buttonSet2">

                            {/* SPEED BUTTONS */}
                            <button
                                className={`btn btn-outline-dark btn-sm formBtn speed-${this.state.speed === SLOW}`}
                                onClick={(event) => { event.preventDefault(); this.setSpeed(SLOW); }}
                                disabled={this.state.timer !== null}
                            >
                                Slow
                            </button>
                            <button
                                className={`btn btn-outline-dark btn-sm formBtn speed-${this.state.speed === MED}`}
                                onClick={(event) => { event.preventDefault(); this.setSpeed(MED); }}
                                disabled={this.state.timer !== null}
                            >
                                Normal
                            </button>
                            <button
                                className={`btn btn-outline-dark btn-sm formBtn speed-${this.state.speed === FAST}`}
                                onClick={(event) => { event.preventDefault(); this.setSpeed(FAST); }}
                                disabled={this.state.timer !== null}
                            >
                                Fast
                            </button>

                            <button
                                className="btn btn-danger btn-sm formBtn"
                                onClick={(event) => { event.preventDefault(); this.getRandom(); }}
                                disabled={this.state.timer !== null}
                            >
                                Random
                            </button>
                            <button
                                className="btn btn-danger btn-sm formBtn"
                                onClick={(event) => { event.preventDefault(); this.getCells(); }}
                                disabled={this.state.timer !== null}
                            >
                                Clear
                            </button>
                        </div>
                    </div>

                    {/* PATTERN LIST */}
                    <div className="patternList">
                        <img className="pattern" src={require("../../images/pattern1.png")} alt="pattern1" onClick={this.getPattern.bind(null, "1")} />
                        <img className="pattern" src={require("../../images/pattern2.png")} alt="pattern2" onClick={this.getPattern.bind(null, "2")} />
                        <img className="pattern" src={require("../../images/pattern3.png")} alt="pattern3" onClick={this.getPattern.bind(null, "3")} />
                        <img className="pattern" src={require("../../images/pattern4.png")} alt="pattern4" onClick={this.getPattern.bind(null, "4")} />
                        <img className="pattern" src={require("../../images/pattern5.png")} alt="pattern5" onClick={this.getPattern.bind(null, "5")} />
                    </div>

                    {/* THEMES */}
                    <div className="themeList text-center">
                        <div className="theme theme-light" onClick={this.setTheme.bind(null, "light")}></div>
                        <div className="theme theme-dark" onClick={this.setTheme.bind(null, "dark")}></div>
                        <div className="theme theme-blue" onClick={this.setTheme.bind(null, "blue")}></div>
                        <div className="theme theme-green" onClick={this.setTheme.bind(null, "green")}></div>
                        <div className="theme theme-wild" onClick={this.setTheme.bind(null, "wild")}></div>
                    </div>

                </div>
            ) : (
                    <></>
                )
        )
    }
}

export default Board;
