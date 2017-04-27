// $(document).ready(function(){
// })

var squares = [1, 2, 3, 4, 5, 6, 7, 8, 9]
var X = 'X';
var O = 'O';
var empty = ' ';

//start off with empty blocks 
squares.map(function(el) {
  // $(`#${el}`).append(`<p>${empty}</p>`);
  $(`#${el}`).append(`<p>${el.toString()}</p>`);
})

function enterPlayers() {
  $('.player1 h3').append('<span> '+$('.name1').val()+'</span')
  $('.player2 h3').append('<span> '+$('.name2').val()+'</span')

  $('input').val(' ')

}
