function player(name, symbol) {
    return { name, symbol };
}

const GameController = {
    gameboard: [
        ['', '', ''],
        ['', '', '']
    ],

    player1: player("player1", 'x'),
    player2: player("player2", 'o'),

    currentPlayer: null,

    checkWinner(player) {
        const gameboard = this.gameboard;

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

        if (
            gameboard[0][0] === player.symbol &&
            gameboard[1][1] === player.symbol &&
            gameboard[2][2] === player.symbol
        ) {
            return true;
        }

        if (
            gameboard[0][2] === player.symbol &&
            gameboard[1][1] === player.symbol &&
            gameboard[2][0] === player.symbol
        ) {
            return true;
        }

        return false;
    },

    playRound(player) {
        let row = parseInt(prompt("Enter row (0, 1, or 2):"), 10);
        let col = parseInt(prompt("Enter col (0, 1, or 2):"), 10);

        if (
            row >= 0 && row < 3 &&
            col >= 0 && col < 3 &&
            this.gameboard[row][col] === ''
        ) {
            this.gameboard[row][col] = player.symbol;
        } else {
            console.log("That place is taken or invalid! Try again");
            this.playRound(player);
        }
    },

    playGame() {
        for (let i = 0; i < 9; i++) {
            console.table(this.gameboard);

            this.currentPlayer = i % 2 === 0 ? this.player1 : this.player2;
            this.playRound(this.currentPlayer);

            if (this.checkWinner(this.currentPlayer)) {
                console.log(`${this.currentPlayer.name} wins !!`);
                console.table(this.gameboard);
                return;
            }
        }

        console.log("It's a draw");
        console.table(this.gameboard);
    }
};

GameController.playGame();
