const gameBoard  = (() => {
    
    const playerTemplate = (name, symbol, playerArray, ai, turn) => {
        return { name, symbol, playerArray, ai, turn}
    }

    const playerOne = playerTemplate('player one', 'X', [], false, true);
    const playerTwo = playerTemplate('player two', 'O', [], false, false);

    const winConditions = [
        ['0','1','2'],
        ['3','4','5'],
        ['6','7','8'],
        ['0','3','6'],
        ['1','4','7'],
        ['2','5','8'],
        ['0','4','8'],
        ['2','4','6']
    ];

    let winner = null;

    let turns = 0;

    let board = [];

    function checkTurn(playerOne, playerTwo) {
        if (playerOne.turn === true) {
        return playerOne;
        } else {
            return playerTwo;
        }
    }

    function switchTurn(playerOne, playerTwo) {
        if (playerOne.turn === true){
            playerOne.turn = false;
            playerTwo.turn = true;
        }else {
            playerOne.turn = true;
            playerTwo.turn = false;
        } return playerOne, playerTwo
    }

    
    function checkWin(winConditions, player){
        for (i = 0; i < winConditions.length; i += 1 ) {
            if (winConditions[i].every(r => player.playerArray.includes(r)) === true) {
                return true 
            };
        } return false;
    }

    const playerTurn = (function () {
        
        const boardSpace = document.querySelectorAll('.board-space');
        boardSpace.forEach( boardSpace => {
            boardSpace.addEventListener('click', e => {
                let player = checkTurn(playerOne, playerTwo);
                
                if (e.target.textContent == '' && gameBoard.winner == null){
                    board.push(e.target.id);
                    player.playerArray.push(e.target.id);
                    e.target.textContent = player.symbol;
                    console.log(player.playerArray);
                    console.log(board);
                    if (checkWin(winConditions, player) === false) {
                        switchTurn(playerOne, playerTwo);
                    } else {
                        document.querySelector('.page-ui').textContent = `${player.name} just won.`;
                        gameBoard.winner = player.name;
                    }
                }
            }
            )
    })
                
        return { boardSpace };


    })();

    return {checkWin, checkTurn, playerTurn, board, playerTwo, winner}
})();