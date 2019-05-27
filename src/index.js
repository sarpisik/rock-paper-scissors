/*

        selectionIndexes: used to calculate winner / loser on round.
        resultIndexes: an object contains score.
        roundCountLimit: defines the round limit.
        roundCount: contains the current round.
        player, computer: numeric indexes to use in conditional functions.

        DOM
        form: form element.
        container: a container parent div.
        roundRow: a parent container of the round section.
        scoreRow: a parent container of the score section.
        buttonsRow: a parent container of the selection buttons.
        playerContainer: contains player name and its score.
        computerContainer: contains computer name and its score.
        selectionsList: contains user selection value.
        playerSelection: contains the user selection.
        resultText: displays the current action result dynamically.

      */
import 'normalize.css';
import './index.css';

let selectionIndexes = {
    rock: 0,
    paper: 1,
    scissors: 2
  },
  player = '1',
  computer = '2',
  resultIndexes = { [player]: 0, [computer]: 0 },
  roundCountLimit,
  roundCount = 0,
  form,
  container,
  roundRow,
  roundTitle,
  roundCountText,
  scoreRow,
  playerContainer,
  playerTitle,
  playerScore,
  computerContainer,
  computerTitle,
  computerScore,
  buttonsRow,
  playerSelection,
  resultText,
  win = 'Win',
  lose = 'Lose',
  tie = 'Tie';

// Init the game
window.addEventListener('load', render);

function render() {
  form = document.querySelector('form');
  //Modern browsers
  form.addEventListener('submit', handleSubmit);
}
function handleSubmit(e) {
  e.preventDefault();
  roundCountLimit = Number(document.querySelector('input').value);
  if (roundCountLimit > 0) {
    container = document.querySelector('main.container');
    // Remove input form
    container.removeChild(form);

    /* Round Row */
    roundRow = createElWithClass('div', 'row');

    // Static round title
    roundTitle = createElWithClass('h3', 'm-1');
    roundTitle.innerText = 'Round: ';
    roundRow.appendChild(roundTitle);

    // Dynamic round count
    roundCountText = createElWithClass('h3', 'm-1');
    roundCountText.innerText = '1';
    roundRow.appendChild(roundCountText);

    /* Score Row */
    scoreRow = createElWithClass('div', 'row');

    // Player score column
    playerContainer = createElWithClass('div', 'text-center m-1');
    playerTitle = createElWithClass('h3', 'underline m-b-1');
    playerTitle.innerText = 'You';
    playerScore = createEl('h3');
    playerScore.innerText = 0;
    appendChildren(playerContainer, playerTitle, playerScore);

    // Computer score column
    computerContainer = createElWithClass('div', 'text-center m-1');
    computerTitle = createElWithClass('h3', 'underline m-b-1');
    computerTitle.innerText = 'Computer';
    computerScore = createEl('h3');
    computerScore.innerText = 0;
    appendChildren(computerContainer, computerTitle, computerScore);

    // Render columns
    appendChildren(scoreRow, playerContainer, computerContainer);

    resultText = document.createElement('p');
    // Create intro text on DOM
    const p = document.createElement('p');
    p.innerText = `Lets beat the machine! Hell Yeah! Make a choice!
        Paper, Scissors or Rock!`;

    // Render Rows
    appendChildren(container, p, roundRow, scoreRow, resultText);
    // Create buttons of selections on DOM
    renderSelections();
  } else {
    alert('Please enter a positive integer');
  }
}

function renderSelections() {
  /* Buttons Row */
  buttonsRow = createElWithClass('div', 'row');
  // Selection button
  Object.keys(selectionIndexes).forEach(function(name) {
    const button = document.createElement('button');
    button.innerText = toFirstLetterUpperCase(name);
    setAttributes(button, {
      type: 'submit',
      name,
      class: 'btn padding-1 m-1'
    });
    button.addEventListener('click', handleSelection);
    // Render button
    buttonsRow.appendChild(button);
  });
  // Render Buttons Row
  container.appendChild(buttonsRow);
}

function handleSelection(e) {
  e.preventDefault();
  resultText.innerText = '';
  playerSelection = e.target.name;
  handleRound(playerSelection, function() {
    // If this is final round check score
    if (roundCount >= roundCountLimit) {
      const scoreResult = Object.keys(resultIndexes).filter(setResult);

      // If both players has equal score, run one more round.
      // Else, finish the game.
      if (scoreResult.length > 1) {
        roundCountLimit++;
        alert('It is a tie! Go one more round!');
      } else {
        // Use conditions to define how the game has ended.
        displayResult(scoreResult[0]);
      }
    }
  });
}

// Run on every round
function handleRound(playerSelection, callBack) {
  const playerSelectionText = playerSelection.toLowerCase(),
    computerSelection = computerPlay(),
    result = playRound(playerSelectionText, computerSelection);
  if (result) {
    resultText.innerText = result;
    callBack();
  } else {
    restartRound('It is a tie! Try again.');
  }
}

// Computer's selection
function computerPlay() {
  const randomIndex = Math.random();
  if (randomIndex < 1 / 3) return 'rock';
  if (randomIndex < 2 / 3) return 'paper';
  return 'scissors';
}

function restartRound(text) {
  resultText.innerText = text;
}

function playRound(playerSelection, computerSelection) {
  switch (
    selectionIndexes[playerSelection] - selectionIndexes[computerSelection]
  ) {
    // Combinations for player wins
    case -2:
    case 1:
      return setRoundScore(player, playerSelection, computerSelection);
      break;

    // Combinations for computer wins
    case -1:
    case 2:
      return setRoundScore(computer, playerSelection, computerSelection);
      break;

    // Tie up, restart the round
    default:
      return false;
      break;
  }
}

function setRoundScore(roundWinner, ...rest) {
  // Update score & round count
  roundCount++;
  resultIndexes[roundWinner] += 1;

  // Render updated score
  roundCountText.innerText = roundCount;

  // Set current round's score message
  return roundMessage(roundWinner, ...rest);
}

function roundMessage(roundWinner, ...rest) {
  // Array of player's and computer's selections
  const selections = rest;

  // Upper case the first letters of selections.
  const playerSelectionUpperCase = toFirstLetterUpperCase(selections[0]);
  const computerSelectionUpperCase = toFirstLetterUpperCase(selections[1]);

  // The winner of the round is player
  if (roundWinner === player) {
    increaseDomScore(playerScore);
    return roundText(win, playerSelectionUpperCase, computerSelectionUpperCase);
  }

  // The winner of the round is computer
  increaseDomScore(computerScore);
  return roundText(lose, computerSelectionUpperCase, playerSelectionUpperCase);
}

function increaseDomScore(el) {
  let prevScore = Number(el.innerText);
  // Updated score
  el.innerText = ++prevScore;
}
function roundText(result, roundWinner, roundLoser) {
  return `You ${result} on round (${roundCount}) ! ${roundWinner} beats ${roundLoser} !`;
}

// Return the key which has max value in the score object
function setResult(key) {
  return resultIndexes[key] >= roundCountLimit / 2;
}

// Print the final of the game.
function displayResult(resultIndex) {
  const body = document.body;
  if (resultIndex === player) {
    body.innerText = `
          Congratulations !
          You ${win} !
          ${getScoreText()}`;
  } else {
    body.innerText = `
        Game Over !
        You ${lose} !
        ${getScoreText()}`;
  }
  // Initialize a refresh button
  const refreshButton = createElWithClass('button', 'btn shadow padding-1 m-1');
  refreshButton.innerText = 'Restart Game';
  // Refresh page on click
  refreshButton.addEventListener('click', function() {
    location.reload(true);
  });
  // Render button
  body.appendChild(refreshButton);
}

// Helper functions
function createEl(el) {
  return document.createElement(el);
}
function createElWithClass(el, classNames) {
  let element = createEl(el);
  element.setAttribute('class', classNames);
  return element;
}
function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}
function appendChildren(parent, ...els) {
  els.forEach(function(el) {
    parent.appendChild(el);
  });
}
function getScoreText() {
  return `The score is: You (${resultIndexes[player]}) - Computer (${
    resultIndexes[computer]
  })`;
}
function toFirstLetterUpperCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
