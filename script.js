const GameController = {
    gameboard: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ],

    player1: {
        name: 'player-1',
        symbol: 'x',
        tag: `<i class="fa-solid fa-xmark cross"></i>`
    },
    
    player2: {
        name: 'player-2',
        symbol: 'o',
        tag: `<i class="fa-solid fa-o zero"></i>`
    },

    currentPlayer: null,
    chance: 0,

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

    playRound(row, col, player) {
        if (this.gameboard[row][col] === '') {
            this.gameboard[row][col] = player.symbol;
            const container = document.getElementById(`${row}${col}`);
            container.innerHTML = player.tag;
        } else {
            console.log("That place is taken or invalid! Try again");
        }
    },

    playGame(row, col) {
        this.currentPlayer = this.chance % 2 === 0 ? this.player1 : this.player2;
        this.playRound(row, col, this.currentPlayer);
        this.chance++;

        if (this.checkWinner(this.currentPlayer)) {
            document.getElementById('winner-container').style.display = 'flex'
            const container = document.getElementById('winner')
            container.innerHTML = `${this.currentPlayer.name} Wins !!`
            return;
        }

        if (this.chance === 9) {
            document.getElementById('winner-container').style.display = 'flex'
            const container = document.getElementById('winner')
            container.innerHTML = `It's a draw`
        }
    },

    enterName(event) {
        event.preventDefault();
        this.player1.name = document.getElementById('p1').value || 'player-1';
        this.player2.name = document.getElementById('p2').value || 'player-2';
        const container = document.getElementById('overlay-container');
        container.style.display = 'none';
    },

    restart(){

        GameController.gameboard = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]

        this.chance = 0

        document.getElementById('winner-container').style.display = "none"

        for(let i = 0; i < 3; i++){

            for(let j = 0; j < 3; j++){

                const container = document.getElementById(`${i}${j}`);
                container.innerHTML = "";
            }
        }
    }
}
