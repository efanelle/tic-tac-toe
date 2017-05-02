# tic-tac-toe
This tic-tac-toe games follows the usual rules!  3 matching symbols in a row and you win.  
When playing with human players, the players will alternate turns back and forth and will also alternate who starts for each game. 

If you decide to play against the computer, enter your own name and then check off the appropriate box.  

At any time, you can reset the board, while keeping current scores and players.  You are also able to choose to start an entirely new game (in case player 2 needs to bail or the computer is too tough! :) )

# let's get started
Simply download and open the zip file, or clone the repo url by running 'git clone https://github.com/efanelle/tic-tac-toe.git'.  Run npm install from within the tic-tac-toe repo to ensure you have necessary dependencies and then npm start.  You will be able to view/play the game at http://localhost:8080.

# all things technical
This project uses HTML, CSS, JS and jQuery.  jQuery made it easy to access and manipulate the DOM. I used flexbox to make the page responsive to resizing and different screen sizes.  I also decided to use vh on my font size to dynamically change the size of the font.

When implementing the ability to play against the computer, I kept all game-play logic the same and just triggered a specific click on an empty `.square` to mimick the player2 move.  I originally planned to move all computer based logic out into it's own function, but while I was doing this, I realized I was repeating much of the same code.  By adding a few simple conditionals, I was able to keep most of my preexisting code and logic the same.  

I elected to put the computer's move on a setTimeout to model more of actual game play rather than an instant move.  

If I had more time, there are several things that I would do.  First, I would add logic into the computer's move to make it more difficult for the user to win.  I would also add the ability to store a user's game.  I would do this by storing a 'game name' and the associated variable values necessary to create the gameboard in a MongoDB.  Retrieving a specific game would populate the variables with stored values to restore the previous game.  

