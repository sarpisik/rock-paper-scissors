import 'normalize.css';
import './index.css';
// import Game from './components';

// Init the game
window.addEventListener('load', render);

function render() {
  // Listen submit event
  document.querySelector('form').addEventListener('submit', handleSubmit);
}
function handleSubmit(e) {
  e.preventDefault();
  let totalRoundCount = Number(document.querySelector('input').value);

  // If the total round value is valid, start the game.
  // Else, alert error.
  if (totalRoundCount > 0) {
    // Remove form element
    document.querySelector('main').removeChild(this);

    // Run game
    import(/* webpackChunkName: "game" */ './components').then(module => {
      const Game = module.default;
      new Game(totalRoundCount);
    });
    // new Game(totalRoundCount);
  } else {
    alert('Please enter a positive integer');
  }
}
