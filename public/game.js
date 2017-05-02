//board square options
var X = 'X';
var O = 'O';
var empty = ' ';

var squares = [1, 2, 3, 4, 5, 6, 7, 8, 9]
var combos = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], 
[2,5,8], [3,6,9], [1,5,9], [3,5,7]]

var movesLeft, moves, move, compMove, 
player1, player2, first, wins1, wins2;

//initialize board with empty blocks 
squares.map(function(el) {
  $(`#${el}`).append(`<p>${empty}</p>`);
})
//get intial variable values and provide inputs
newGame();

//add ability to submit on enter
$('.user').keyup(function(e) {
  if (e.keyCode === 13) {
    $('#users').click();
  }
})

function newGame() {
  $('.show').show();
  $('.btns').hide();

 //assign variable values
  movesLeft = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  moves=[];
  move = true;
  compMove;
  player1 = 'Player 1';
  player2 = 'Player 2';
  first = '.player1';
  wins1 = 0, wins2 = 0;

  $('.btn h1').text(`${empty}`);
  $('.active').removeClass('active');
  $('.player1 h2').text(`${player1}: X`);
  $('.player2 h2').text(`${player2}: O`);
  $('.player1 .wins').text('0');
  $('.player2 .wins').text('0');

  clearBoard();
  $('.square').off();
}


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
  player1 = $('.name1').val() || player1;
  player2 = $('.name2').val() || player2;
  if(checked) player2 = checked;

  $('.player1 h2').text(`${player1}: X`);
  $('.player2 h2').text(`${player2}: O`);
  
  $('.show').hide();
  $('.btns').show();
  $('.user').val('')
  $('.computer').prop('checked', false)
  $(first).addClass('active');

  // start event listener so moves can be made
  $('.square').on('click',squareMoves)
}

//track moves 
function squareMoves(e) {
  var space = Number(this.id);
  if (moves.indexOf(space) < 0) {

    var player, color, piece, current, next;
    if(move) {
      piece = X;
      player = player1;
      color = '#FFBEB9'
      current = '.player1'
      next = '.player2'
    } else {
      piece = O;
      player = player2;
      color = '#4070FF'
      current = '.player2'
      next = '.player1'
    }
    $(`#${space}`).text(piece).css({'color': color, 'font-family': 'Baloo'}).addClass('selected')
    moves.push(space);
    movesLeft.splice(movesLeft.indexOf(space), 1);
    $(current).removeClass('active')
    $(next).addClass('active')
    return checkWinner(player);
  }
}

//reset game board 
function reset() {
  clearBoard()

  moves = [];
  movesLeft = [1,2,3,4,5,6,7,8,9]
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

  $('.active').removeClass('active')
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
  if (moves.length === 9) {
      $('.btn h1').text(`Tie, play again!`)
  }

  // if player 2 is computer, set off click handler for next move
  if (player2 === 'Computer' && !move) {
      setTimeout(function() {
        computerTurn();
      }, 1000)
  } 
}
//*******************************************//
//logic for computer

function computerTurn() {
  for (let i = 0; i < combos.length; i++) {
    var win = combos[i];
    var count = 0;
    var noMatch;
    for(let j = 0; j < win.length; j++) {
      let el = win[j];
      if ($(`#${el}`).text() === X) {
        count++
      } 
      else if ($(`#${el}`).text() === empty){
        console.log(el)
        noMatch = el;
      }
    }
      if(count === 2 && noMatch) {
        console.log('noMatch', noMatch, 'move', move)
        return $(`#${noMatch}`).click();
      }
  }

  var comp = Math.floor(Math.random() * movesLeft.length);
  compMove = movesLeft[comp];
  return $(`#${compMove}`).click();
}
