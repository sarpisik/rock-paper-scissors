import 'normalize.css';
import './index.css';

// Init the game
window.addEventListener('load', render);

function render() {
  // Registering Our Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  } else {
    window.alert(
      'Hi! Welcome to Rock-Paper-Scissors game app. If you like to play the game offline, please visit back by using a different browser which supports service workers.'
    );
  }

  // Listen submit event
  document.querySelector('form').addEventListener('submit', handleSubmit);
}

navigator.onLine ||
  window.alert('Looks like you are playing the game offline. Enjoy! :)');

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
  } else {
    alert('Please enter a positive integer');
  }
}
