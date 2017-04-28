// $(document).ready(function(){
// })

var squares = [1, 2, 3, 4, 5, 6, 7, 8, 9]
var X = 'X';
var O = 'O';
var empty = ' ';
var selected = [];
var move = true;
var player1, player2;

//initialize board with empty blocks 
squares.map(function(el) {
  $(`#${el}`).append(`<p>${empty}</p>`);
  // $(`#${el}`).append(`<p>${el.toString()}</p>`);
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
}

//add ability to submit on enter
$('.user').keyup(function(e) {
  if (e.keyCode === 13) {
    $('#users').click();
  }
})

$('.square').on('click', function(e) {
  // e.preventDefault;
  if(selected.indexOf(this.id) < 0){
    selected.push(this.id);
    if(move) {
      $(this).text(X).addClass('selected')
      $('.player2').addClass('active')
      $('.player1').removeClass('active')
    } else {
      $(this).text(O).addClass('selected')
      $('.player2').removeClass('active')
      $('.player1').addClass('active')
    }
  }
  move = !move;
})

function reset() {
  squares.map(function(square) {
    $(`#${square}`).text(`${empty}`).removeClass('selected');
  }) 
  selected = [];
  console.log('resetting...')
}