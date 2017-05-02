// $(document).ready(function(){
// })

//board square options
var X = 'X';
var O = 'O';
var empty = ' ';

var squares = [1, 2, 3, 4, 5, 6, 7, 8, 9]
var combos = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], 
[2,5,8], [3,6,9], [1,5,9], [3,5,7]]

var movesLeft = [1, 2, 3, 4, 5, 6, 7, 8, 9]
var moves1 = [];
var moves2 = [];
var move = true;
var compMove;
var player1 = 'Player 1';
var player2 = 'Player 2';
var first = '.player1';
var wins1 = 0, wins2 = 0;


function newGame() {
  $('input').show()
  $('label').show()
  $('#users').show()
  $('.btns').hide()

  reset();
  move = true;
  compMove;
  player1 = 'Player 1';
  player2 = 'Player 2';
  first = '.player1';
  wins1 = 0, wins2 = 0;


  $('.player1').removeClass('active')
  $('.player2').removeClass('active')
  $('.player1 h2').text(`${player1}: X`)
  $('.player2 h2').text(`${player2}: O`)
  $('.player1 .wins').text('0');
  $('.player2 .wins').text('0');

  clearBoard()
  $('.square').off();
}
//initialize board with empty blocks 
squares.map(function(el) {
  $(`#${el}`).append(`<p>${empty}</p>`);
})

//add ability to submit on enter
$('.user').keyup(function(e) {
  if (e.keyCode === 13) {
    $('#users').click();
  }
})

function clearBoard() {
    squares.forEach(function(square) {
    $(`#${square}`).text(`${empty}`).removeClass('selected winner');
  }) 
}

//**********//

// change values of player names or keep default names
// check for computer
function enterPlayers() {
  var checked = $('.computer:checked').val();
  player1 = $('.name1').val() || player1
  player2 = $('.name2').val() || player2
  if(checked) player2 = checked

  $('.player1 h2').text(`${player1}: X`)
  $('.player2 h2').text(`${player2}: O`)
  
  $('input').hide()
  $('label').hide()
  $('#users').hide()
  $('.btns').show()
  $(first).addClass('active')

  $('.user').val('')

  // start event listener so moves can be made
  $('.square').on('click',squareMoves)

}

//track moves 
function squareMoves(e) {
  var space = Number(this.id);
  if (moves1.indexOf(space) < 0 && moves2.indexOf(space) < 0) {
    if(move) {
      moves1.push(space)
      $(`#${space}`).text(X).css({'color': '#FFBEB9'}).addClass('selected')
      movesLeft.splice(movesLeft.indexOf(space), 1);
      $('.player2').addClass('active')
      $('.player1').removeClass('active')
      return checkWinner(player1);
    } else {

      if (player2==='Computer') {
        space = compMove;
      }

      moves2.push(space)
      $(`#${space}`).text(O).css({'color': '#4070FF'}).addClass('selected')
      movesLeft.splice(movesLeft.indexOf(space), 1);
      $('.player2').removeClass('active')
      $('.player1').addClass('active')
      return checkWinner(player2);
    }
  }
}

//reset game board 
function reset() {
  clearBoard()

  moves1 = [], moves2 = [], movesLeft = [1,2,3,4,5,6,7,8,9]
  $('.btn h1').text(`${empty}`)
  
  // alternate who moves first if not computer
  if(player2!=='Computer') {
    if(first === '.player1') {
      first = '.player2'
      move = false;
    } else {
      first = '.player1'
      move = true;
    }
  } else {
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
        $('.player2').removeClass('active')
      }
      if(matchO) {
        wins2++
         $('.player2 .wins').text(wins2);
         $('.player1').removeClass('active')
      }

      $('.btn h1').text(`${player} is the winner!`)

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
      setTimeout(function(){
        alert('TIE! Play again!')
      }, 200)
    }

  // if player 2 is computer, set off click handler for next move
  if (player2 === 'Computer' && !move) {
      var comp = Math.floor(Math.random() * movesLeft.length);
      compMove = movesLeft[comp];
      setTimeout(function() {
        $(`#${compMove}`).click();
      }, 1000)
  } 
}

