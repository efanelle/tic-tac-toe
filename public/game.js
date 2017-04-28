// $(document).ready(function(){
// })

//board square options
var X = 'X';
var O = 'O';
var empty = ' ';

var squares = [1, 2, 3, 4, 5, 6, 7, 8, 9]
var combos = [[1,2,3], [4,5,6], [7,8,9], [1,4,7], 
[2,5,8], [3,6,9], [1,5,9], [3,5,7]]
var selected = [];
var moves1 = [];
var moves2 = [];
var move = true;
var player1 = 'Player 1';
var player2 = 'Player 2';

//initialize board with empty blocks 
squares.map(function(el) {
  $(`#${el}`).append(`<p>${empty}</p>`);
})

function enterPlayers() {
  player1 = $('.name1').val()
  player2 = $('.name2').val()
  if(player1 !== ''){
    $('.player1 h3').text(`${player1} X`)
  }
  if(player2 !== '') {
    $('.player2 h3').text(`${player2} O`)
  }
  $('input').val('')
  $('.player1').addClass('active')
  $('#users').hide()
}

//add ability to submit on enter
$('.user').keyup(function(e) {
  if (e.keyCode === 13) {
    $('#users').click();
  }
})

$('.square').on('click', function(e) {

  if (moves1.indexOf(this.id) < 0 && moves2.indexOf(this.id) < 0) {
    if(move) {
      moves1.push(this.id)
      $(this).text(X).addClass('selected')
      $('.player2').addClass('active')
      $('.player1').removeClass('active')
      checkWinner(player1);
    } else {
      moves2.push(this.id)
      $(this).text(O).addClass('selected')
      $('.player2').removeClass('active')
      $('.player1').addClass('active')
      checkWinner(player2);
    }
  }
  move = !move;
})

function reset() {
  squares.map(function(square) {
    $(`#${square}`).text(`${empty}`).removeClass('selected winner');
  }) 
  selected = [], moves1 = [], moves2 = [];
  $('.player1').addClass('active')
  $('.player2').removeClass('active')
  console.log('resetting...')
  $('#users').show()
  move = true;
}

function checkWinner (player) {
  for (var i = 0; i < combos.length; i++) {
    var win = combos[i];
    var matchX = win.every(function(el) {
      return $('#' + el).text() === X
    })
    var matchO = win.every(function(el) {
      return $('#' + el).text() === O
    })
    if(matchX || matchO) {
      console.log(player)
      alert (`${player} is the winner!`)
      win.map(function(el) {
        $(`#${el}`).addClass('winner');
      })
    }

  }

}

