// $(document).ready(function(){
// })

//board square options
var X = 'X';
var O = 'O';
var empty = ' ';

var squares = [1, 2, 3, 4, 5, 6, 7, 8, 9]
var combos = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], 
[2,5,8], [3,6,9], [1,5,9], [3,5,7]]
var moves1 = [];
var moves2 = [];
var move = true;
var player1 = 'Player 1';
var player2 = 'Player 2';
var first = '.player1';
var wins1 = 0, wins2 = 0;

//initialize board with empty blocks 
squares.map(function(el) {
  $(`#${el}`).append(`<p>${empty}</p>`);
})

// change values of player names or keep default 
// values of 'Player 1' and 'Player 2'
function enterPlayers() {
  player1 = $('.name1').val() || player1
  player2 = $('.name2').val() || player2

  $('.player1 h3').text(`${player1}: X`)
  $('.player2 h3').text(`${player2}: O`)
  
  $('input').val('')
  $(first).addClass('active')
  $('#users').hide()
}

//add ability to submit on enter
$('.user').keyup(function(e) {
  if (e.keyCode === 13) {
    $('#users').click();
  }
})

//track moves 
function squareMoves(e) {
  if (moves1.indexOf(this.id) < 0 && moves2.indexOf(this.id) < 0) {
    if(move) {
      moves1.push(this.id)
      $(this).text(X).css({'color': 'blue'}).addClass('selected')
      $('.player2').addClass('active')
      $('.player1').removeClass('active')
      return checkWinner(player1);
    } else {
      moves2.push(this.id)
      $(this).text(O).css({'color': 'red'}).addClass('selected')
      $('.player2').removeClass('active')
      $('.player1').addClass('active')
      return checkWinner(player2);
    }
  }
}

//add event listener 
$('.square').on('click',squareMoves)

//reset game board 
function reset() {
  squares.map(function(square) {
    $(`#${square}`).text(`${empty}`).removeClass('selected winner');
  }) 
  moves1 = [], moves2 = [];
  // alternate who moves first
  if(first === '.player1') {
    first = '.player2'
    move = false;
  } else {
    first = '.player1'
    move = true;
  }

  $('.player1').removeClass('active')
  $('.player2').removeClass('active')
  $(first).addClass('active');

  //turn click handler back on
  $('.square').on('click', squareMoves);
}

function checkWinner (player) {
  for (var i = 0; i < combos.length; i++) {
    var win = combos[i];
    var matchX = win.every(function(el) {
      return $(`#${el}`).text() === X
    })
    var matchO = win.every(function(el) {
      return $(`#${el}`).text() === O
    })
    if(matchX || matchO) {
      if(matchX) {
        wins1++
        $('.player1 .wins').text(wins1);
      }
      if(matchO) {
        wins2++
         $('.player2 .wins').text(wins2);
      }

      alert (`${player} is the winner!`)

      //add styling to show the win
      win.map(function(el) {
        $(`#${el}`).addClass('winner');
      })

      //turn off click handler so no further moves can be made
      $('.square').off();
      return;
    } 
  }
  // change active class to other player if no winner
  move = !move;
  // check for a tie before returning to game
  if (moves1.length + moves2.length === 9) {
      alert('TIE! Play again!')
    } 
}

