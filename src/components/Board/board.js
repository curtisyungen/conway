import React, { Component } from "react";
import Modal from "react-responsive-modal";
import Row from "../Row/row";
import "./board.css";

import getPatterns from "../../utils/patterns";

const DEFAULT_SPEED = 250;
const DEFAULT_SIZE = 25;
const DEFAULT_THEME = "light";
const DEFAULT_BTN_THEME = "dark";
const FAST = 250;
const SLOW = 500;

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
            btnTheme: null,
            openModal: false,
            openThemes: false,
            disablePatterns: false,
        }
    }

    componentDidMount = () => {
        this.getScreenSize();
    }

    componentWillUnmount = () => {
        clearInterval(this.state.timer);
    }

    // Shrinks board to 10 x 10 if mobile screen size
    // Also disables pre-loaded patterns
    getScreenSize = () => {
        let width = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;

        let numRows = DEFAULT_SIZE;
        let numCols = DEFAULT_SIZE;
        let disablePatterns = false;

        if (width <= 768) {
            numRows = 10;
            numCols = 10;
            disablePatterns = true;
        }

        this.setState({
            numRows: numRows,
            numCols: numCols,
            speed: DEFAULT_SPEED,
            theme: DEFAULT_THEME,
            btnTheme: DEFAULT_BTN_THEME,
            disablePatterns: disablePatterns,
        }, () => {
            this.getCells();
        });
    }

    // Sets interval speed of simulation to either fast or slow
    setSpeed = (speed) => {
        this.setState({
            speed: speed,
        });
    }

    // Sets color theme of entire display
    setTheme = (theme) => {

        let btnTheme = "dark";
        if (theme === "blue" || theme === "green") {
            btnTheme = "light";
        }

        this.setState({
            theme: theme,
            btnTheme: btnTheme,
        }, () => {
            this.closeThemes();
        });
    }
    
    // Opens the Pattern modal
    openModal = () => {
        this.setState({
            openModal: true,
        });
    }
    
    // Closes the Pattern modal
    closeModal = () => {
        this.setState({
            openModal: false,
        });
    }

    // Opens the Theme modal
    openThemes = () => {
        this.setState({
            openThemes: true,
        });
    }

    // Closes the Theme modal
    closeThemes = () => {
        this.setState({
            openThemes: false,
        });
    }

    // Loads a pattern from file and renders to board
    getPattern = (pattern) => {
        let board;

        switch(pattern) {
            case "1": board = getPatterns.getPattern1(); break;
            case "2": board = getPatterns.getPattern2(); break;
            case "3": board = getPatterns.getPattern3(); break;
            case "4": board = getPatterns.getPattern4(); break;
            case "5": board = getPatterns.getPattern5(); break;
            case "8": board = getPatterns.getPattern8(); break;
            case "9": board = getPatterns.getPattern9(); break;
            default: board = getPatterns.getPattern1();
        }

        this.setState({
            board: board,
        }, () => {
            this.closeModal();
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

    // Generates a random pattern on the board
    getRandom = () => {
        let numRows = parseInt(this.state.numRows);
        let numCols = parseInt(this.state.numCols);

        let board = [];
        for (var i = 0; i < numRows; i++) {

            let row = [];
            for (var j = 0; j < numCols; j++) {
                let cell = {
                    row: i,
                    col: j,
                    val: (Math.random() * 50) < 10,
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

    // Advances to next frame in simulation
    nextFrame = (event) => {
        event.preventDefault();
        this.getValues();
    }

    // Starts simulation
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

    // Stops the simulation
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
                <div className={`main main-${this.state.theme}`}>

                    {/* TITLE */}
                    <h4 className={`title text-center`}>
                        <a className={`wikiLink color-${this.state.btnTheme}`} href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank" rel="noopener noreferrer">
                            Conway's Game of Life
                        </a>
                        <p className={`subTitle color-${this.state.btnTheme}`}>Draw or load a pattern on the board and click Start.</p>
                    </h4>

                    {/* BOARD */}
                    <div className={`board board-${this.state.theme}`}>
                        {this.state.board.map(row => (
                            <Row
                                key={Math.random() * 100000}
                                row={row}
                                updateBoard={this.updateBoard}
                                theme={this.state.theme}
                                timer={this.state.timer}
                            />
                        ))}
                    </div>

                    {/* CONTROL BAR */}
                    <div className="controlBar">
                        <div className="buttonSet1">

                            {/* SPEED BUTTONS */}
                            {this.state.speed === FAST ? (
                                <button
                                    className={`btn btn-${this.state.btnTheme} btn-sm formBtn speed-${this.state.speed === SLOW}`}
                                    onClick={(event) => { event.preventDefault(); this.setSpeed(SLOW); }}
                                    disabled={this.state.timer !== null}
                                >
                                    Go Slower
                                </button>
                            ) : (
                                <button
                                    className={`btn btn-${this.state.btnTheme} btn-sm formBtn speed-${this.state.speed === FAST}`}
                                    onClick={(event) => { event.preventDefault(); this.setSpeed(FAST); }}
                                    disabled={this.state.timer !== null}
                                >
                                    Go Faster
                                </button>
                            )}

                            {/* CONTROL BUTTONS */}
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
                                className={`btn btn-${this.state.btnTheme} btn-sm formBtn`}
                                onClick={this.nextFrame}
                                disabled={this.state.timer !== null}
                            >
                                Next
                            </button>

                            {/* <button
                                className="btn btn-danger btn-sm formBtn"
                                onClick={(event) => { event.preventDefault(); this.getRandom(); }}
                                disabled={this.state.timer !== null}
                            >
                                Random
                            </button> */}

                            <button
                                className={`btn btn-${this.state.btnTheme} btn-sm formBtn`}
                                onClick={(event) => { event.preventDefault(); this.openThemes(); }}
                                disabled={this.state.timer !== null}
                            >
                                Themes
                            </button>

                            <button
                                className={`btn btn-${this.state.btnTheme} btn-sm formBtn`}
                                onClick={(event) => { event.preventDefault(); this.openModal(); }}
                                disabled={this.state.timer !== null || this.state.disablePatterns}
                            >
                                Patterns
                            </button>

                            <button
                                className="btn btn-danger btn-sm formBtn"
                                onClick={(event) => { event.preventDefault(); this.getCells(); }}
                                disabled={this.state.timer !== null}
                            >
                                Clear
                            </button>
                        </div>

                        {/* FOOTNOTE */}
                        {this.state.disablePatterns ? (
                            <p className={`subTitle text-center color-${this.state.btnTheme}`}>Pre-loaded patterns not available on mobile.</p>
                        ) : (
                            <></>
                        )}
                    </div>

                    {/* CURTIS PORTFOLIO LINK */}
                    <div className="curtis text-center">
                        <p className={`curtisText color-${this.state.btnTheme}`}>
                            This project was created by Curtis Yungen.
                            Check out his Web Development Portfolio here: 
                            <a 
                                className={`btn btn-warning btn-sm`}
                                href="https://curtisyungen.github.io/Portfolio"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Hire Curtis!
                            </a>
                        </p>
                    </div>

                    {/* PATTERN LIST */}
                    {this.state.openModal ? (
                        <Modal 
                            open={this.state.openModal}
                            onClose={this.closeModal}
                        >
                            <div className="patternList">
                                <img className="pattern" src={require("../../images/pattern2.png")} alt="pattern2" onClick={this.getPattern.bind(null, "2")} />
                                <img className="pattern" src={require("../../images/pattern3.png")} alt="pattern3" onClick={this.getPattern.bind(null, "3")} />
                                <img className="pattern" src={require("../../images/pattern4.png")} alt="pattern4" onClick={this.getPattern.bind(null, "4")} />
                                <img className="pattern" src={require("../../images/pattern8.png")} alt="pattern8" onClick={this.getPattern.bind(null, "8")} />
                            </div>
                        </Modal>
                    ) : (
                        <></>
                    )}

                    {/* THEMES */}
                    {this.state.openThemes ? (
                        <Modal
                            open={this.state.openThemes}
                            onClose={this.closeThemes}
                        >
                            <div className="themeList text-center">
                                <div className="theme theme-light" onClick={this.setTheme.bind(null, "light")}></div>
                                <div className="theme theme-dark" onClick={this.setTheme.bind(null, "dark")}></div>
                                <div className="theme theme-blue" onClick={this.setTheme.bind(null, "blue")}></div>
                                <div className="theme theme-green" onClick={this.setTheme.bind(null, "green")}></div>
                            </div>
                        </Modal>
                    ) : (
                        <></>
                    )}

                </div>
            ) : (
                    <></>
                )
        )
    }
}

export default Board;
