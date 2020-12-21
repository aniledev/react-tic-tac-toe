// To collect data from multiple children, or to have two child components communicate with each other, you need to declare the shared state in their parent component instead.
// The parent component can pass the state back down to the children by using props; this keeps the child components in sync with each other and with the parent component.

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

function Square(props) {
  // rewrite Square as a function component, not a class component, because it no longer tracks its own state
  return (
    <button
      className="square"
      // adding an onClick callback to the square to make sure they are interactive
      // when calling setState, React automaticaly updates the child components inside of it too
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    // the below line creates an this.state object with a key of squares and property which is an array which is a length of 9, with all values being null
    this.state = {
      squares: Array(9).fill(null),
      // each time a player moves, xIsNext will be flipped to determine which player goes next and the game's state will be saved
      xIsNext: true,
    };
  }

  // this changes the squares array the state of each square is being kept
  handleClick(i) {
    const squares = this.state.squares.slice();
    //this allows X and O to take turns when a square is clicked on
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    const status = "Next player: X";

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));
