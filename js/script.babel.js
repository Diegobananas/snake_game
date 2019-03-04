'use strict';

var cardsArray = [{
  'name': 'biterattle',
  'img': 'img/biterattle.jpg',
},
{
  'name': 'eyeball',
  'img': 'img/eyeball.jpg',
},
{
  'name': 'fangs',
  'img': 'img/fangs.jpg',
},
{
  'name': 'head',
  'img': 'img/head.jpg',
},
{
  'name': 'RatSnake',
  'img': 'img/RatSnake.jpg',
},
{
  'name': 'Rattle2.0',
  'img': 'img/Rattle2.0.jpg',
},
{
  'name': 'scarysnake',
  'img': 'img/scarysnake.jpg',
},
{
  'name': 'sniffer',
  'img': 'img/sniffer.jpg',
},
{
  'name': 'tongue',
  'img': 'img/tongue.jpg',
},
{
  'name': 'vipersfoundt',
  'img': 'img/vipersfoundt.jpg',
},
{
  'name': 'timberb',
  'img': 'img/timberb.jpg',
},
{
  'name': 'snake_viper',
  'img': 'img/snake_viper.jpg',
}
];

var gameGrid = cardsArray.concat(cardsArray).sort(function () {
  return 0.5 - Math.random();
});

var firstGuess = '';
var secondGuess = '';
var count = 0;
var previousTarget = null;
var delay = 1200;

var game = document.getElementById('game');
var grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

gameGrid.forEach(function (item) {
  var name = item.name,
      img = item.img;


  var card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = name;

  var front = document.createElement('div');
  front.classList.add('front');

  var back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = 'url(' + img + ')';

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

var match = function match() {
  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {
    card.classList.add('match');
  });
};

var resetGuesses = function resetGuesses() {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(function (card) {
    card.classList.remove('selected');
  });
};

grid.addEventListener('click', function (event) {

  var clicked = event.target;

  if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains('match')) {
    return;
  }

  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      console.log(firstGuess);
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      console.log(secondGuess);
      clicked.parentNode.classList.add('selected');
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }
});
