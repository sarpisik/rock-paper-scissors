import Title from './title';
import Row from './row';
import * as TEXT from '../constants';
import { ScoreBoard, RoundBoard } from './board';
import { SelectionButton, RestartGameButton } from './button';
import { toFirstLetterUpperCase, renderChildren } from './helpers';

let selectionIndexes = {
  rock: 0,
  paper: 1,
  scissors: 2
};

class Game {
  constructor(totalRoundCount, playerScoreBoard, computerScoreBoard) {
    this.totalRoundCount = totalRoundCount;
    this.round = 1;
    this.playerScore = 0;
    this.computerScore = 0;

    /* DOM Elements */

    // Round Board
    this.roundBoardContainer = new Row('font-4');
    this.roundBoard = new RoundBoard();

    // Score Board
    this.scoreBoardContainer = new Row('font-4');
    this.playerScoreBoard = new ScoreBoard('You');
    this.computerScoreBoard = new ScoreBoard('Comp');

    // Action Board
    this.actionBoardContainer = new Row('font-3');
    this.actionText = new Title();

    // Selection Buttons
    this.buttonsContainer = new Row('justify-around');
    this.paperButton = new SelectionButton(
      'paper',
      this.handleClick.bind(this)
    );
    this.rockButton = new SelectionButton('rock', this.handleClick.bind(this));
    this.scissorsButton = new SelectionButton(
      'scissors',
      this.handleClick.bind(this)
    );

    // Initialize above elements
    this.renderApp();

    // Restart Game Button
    this.restartGameButton = new RestartGameButton(
      'Start a New Game',
      this.restartGame.bind(this)
    );
  }

  renderApp() {
    this.roundBoard.setParent(this.roundBoardContainer.element);
    renderChildren(this.scoreBoardContainer.element, [
      this.playerScoreBoard,
      this.computerScoreBoard
    ]);
    this.actionText.setParent(this.actionBoardContainer.element);
    renderChildren(this.buttonsContainer.element, [
      this.paperButton,
      this.rockButton,
      this.scissorsButton
    ]);
  }

  handleClick({ currentTarget }) {
    this.playerSelection = currentTarget.name;
    this.computerSelection = this.getCompSelection();
    this.handleCompare();
    // this.actionText.updateContent(currentTarget.name);
  }

  getCompSelection = () => {
    const randomIndex = Math.random();
    if (randomIndex < 1 / 3) return 'rock';
    if (randomIndex < 2 / 3) return 'paper';
    return 'scissors';
  };

  handleCompare = () => {
    switch (
      selectionIndexes[this.playerSelection] -
        selectionIndexes[this.computerSelection]
    ) {
      // Combinations for player wins
      case -2:
      case 1:
        this.setWinner(true);
        break;

      // Combinations for computer wins
      case -1:
      case 2:
        this.setWinner(false);
        break;

      default:
        this.restartRound();
        break;
    }
  };

  restartRound = () => {
    this.setActionText('It is a tie! Try again.');
  };

  setWinner = playerWin => {
    let roundText;
    // Uppercase first letters of selections
    const playerSelection = toFirstLetterUpperCase(this.playerSelection);
    const computerSelection = toFirstLetterUpperCase(this.computerSelection);

    if (playerWin) {
      this.playerScore++;
      this.playerScoreBoard.updateScore(this.playerScore);
      roundText = `You Win! ${playerSelection} beats ${computerSelection}`;
    } else {
      this.computerScore++;
      this.computerScoreBoard.updateScore(this.computerScore);
      roundText = `You Lose! ${computerSelection} beats ${playerSelection}`;
    }

    this.setActionText(roundText);
    this.handleRound();
  };

  setActionText = text => this.actionText.updateContent(text);

  handleRound = () => {
    this.roundBoard.updateScore(this.round);

    // If this was last round and...
    if (this.round === this.totalRoundCount) {
      // If it ended with a draw, keep playing game.
      // Else, finish the game.
      if (this.playerScore === this.computerScore) {
        this.totalRoundCount++;
        alert('It ended with a draw.! Go one more round!');
      } else {
        this.handleFinishGame();
      }
    } else {
      this.round++;
    }
  };

  handleFinishGame = () => {
    const playerWins = this.playerScore > this.computerScore;
    const winnerScore = playerWins ? this.playerScore : this.computerScore;
    const loserScore = playerWins ? this.computerScore : this.playerScore;

    const scoreText = `${winnerScore} : ${loserScore}`;
    const winnerText = playerWins
      ? `
    Congratulations !
    You Win!
    The score is ${scoreText}
    `
      : `
    Game Over !
    You Lose!
    The score is ${scoreText}
    `;
    document.body.setAttribute('class', 'flex-column final-text bg-gradient');
    document.body.innerText = winnerText;
    this.restartGameButton.setParent(document.body);
  };

  restartGame = () => location.reload(true);
}

export default Game;
