$(document).ready(function() {

    // Setup game.
    // @todo: Make name pop-ups more user-friendly. Perhaps optional?
    var piecesColor = prompt("Please select the color (red or black)")

    // Setup Player and Color based on the selecter color option    
    if (piecesColor == "black") {
        config.blackPlayerName = prompt("Please enter the first player's name. This player will use black game pieces.", config.blackPlayerName) || config.blackPlayerName;
        config.redPlayerName = prompt("Please enter the second player's name. This player will use red game pieces.", config.redPlayerName) || config.redPlayerName;
        $('.prefix').text(config.playerPrefix);
        $('#player').addClass(currentPlayer).text(config[currentPlayer + "PlayerName"]);
    }
    else if (piecesColor == "red"){
        config2.redPlayerName = prompt("Please enter the first player's name. This player will use red game pieces.", config2.redPlayerName) || config2.redPlayerName;
        config2.blackPlayerName = prompt("Please enter the second player's name. This player will use black game pieces.", config2.blackPlayerName) || config2.blackPlayerName;
        $('.prefix').text(config2.playerPrefix);
        $('#player').addClass(currentPlayer2).text(config2[currentPlayer2 + "PlayerName"]);
    }
    else {
        alert("You can choose only red or black colors")
        location.reload();
    }

    // Trigger the game sequence by clicking on a position button on the board.
    $('.board button').click(function(e) {
        // Detect the x and y position of the button clicked.
        var y_pos = $('.board tr').index($(this).closest('tr'));
        var x_pos = $(this).closest('tr').find('td').index($(this).closest('td'));

        // Ensure the piece falls to the bottom of the column.
        y_pos = dropToBottom(x_pos, y_pos);

        if (positionIsTaken(x_pos, y_pos)) {
            alert(config.takenMsg);
            return;
        }

        if (piecesColor == "black") {
            addDiscToBoard(currentPlayer, x_pos, y_pos);
        }
        else {
            addDiscToBoard(currentPlayer2, x_pos, y_pos);
        }
            
        printBoard();

        // Check to see if we have a winner.
        if (verticalWin() || horizontalWin() || diagonalWin()) {
            // Destroy our click listener to prevent further play.
            $('.board button').unbind('click');
            $('.prefix').text(config.winPrefix);
            $('.play-again').show("slow");
            return;

        } else if (gameIsDraw()) {
            // Destroy our click listener to prevent further play.
            $('.board button').unbind('click');
            $('.message').text(config.drawMsg);
            $('.play-again').show("slow");
            return;
        }
        if (piecesColor == 'black') {
            changePlayer();
        }
        else {
            changePlayer2();
        }      
    });

    $('.play-again').click(function(e) {
        location.reload();
    });

});