let gameboard = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

function checkWinner(player) {

    for (let i = 0; i < 3; i++) {
        if (gameboard[i].every(cell => cell === player.symbol)) {
            return true;
        }
    }

    for (let i = 0; i < 3; i++) {
        if (gameboard.every(row => row[i] === player.symbol)) {
            return true;
        }
    }

    if (gameboard[0][0] === player.symbol && gameboard[1][1] === player.symbol && gameboard[2][2] === player.symbol) {
        return true;
    }

    if (gameboard[0][2] === player.symbol && gameboard[1][1] === player.symbol && gameboard[2][0] === player.symbol) {
        return true;
    }

    return false;
}

function playRound(player) {
    let row = parseInt(prompt("Enter row (0, 1, or 2):"), 10);
    let col = parseInt(prompt("Enter col (0, 1, or 2):"), 10);

    if (row >= 0 && row < 3 && col >= 0 && col < 3 && gameboard[row][col] === '') {
        gameboard[row][col] = player.symbol;
    } else {
        console.log("That place is taken or invalid! Try again");
        playRound(player);
    }
}

const player1 = {
    name: 'player 1',
    symbol: 'x',
};

const player2 = {
    name: 'player 2',
    symbol: 'o',
};

function playGame() {
    for (let i = 0; i < 9; i++) {
        console.table(gameboard);

        const currentPlayer = i % 2 === 0 ? player1 : player2;
        playRound(currentPlayer);
        
        if (checkWinner(currentPlayer)) {
            console.log(`${currentPlayer.name} wins !!`);
            console.table(gameboard);
            return;
        }
    }

    console.log("It's a draw");
    console.table(gameboard);
}

playGame();
