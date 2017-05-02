# tic-tac-toe
This tic-tac-toe games follows the usual rules!  3 matching symbols in a row and you win.  
When playing with human players, the players will alternate turns back and forth and will also alternate who starts for each game. 

If you decide to play against the computer, enter your own name and then check off the appropriate box.  

You can reset the board, while keeping current scores and players, at any time.  You are also able to choose to start an entirely new game (in case player 2 needs to bail or the computer is too tough! :) )

#Let's get started
Simply clone and download the project.  Run npm install to ensure you have necessary dependencies and then npm start.  You will be able to view/play the game at http://localhost:8080.

#technical stuff
This project uses HTML, CSS, JS and jQuery.  jQuery made it easy to access and manipulate the DOM.  When implementing the ability to play against the computer, I kept all logic the same and just triggered a specific click on an empty `.square` to mimick the player2 move.  I elected to put this on a setTimeout to model more of actual game play rather than an instant move.  