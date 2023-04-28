const App = {
    // All of our selected HTML elemnents
    $: {
        menu: document.querySelector('[data-id="menu"]'),
        menuItems: document.querySelector('[data-id="menu-items"]'),
        resetBtn: document.querySelector('[data-id="reset-btn"]'),
        newRoundBtn: document.querySelector('[data-id="new-round-btn"]'), 
        squares: document.querySelectorAll('[data-id="square"]'),
        modal: document.querySelector('[data-id="modal"]'),
        modalText: document.querySelector('[data-id="modal-text"]'),
        modalBtn: document.querySelector('[data-id="modal-btn"]'),
    },

    state: {
        moves: [],
    },

    getGameStatus (moves) {

        const p1Moves = moves.filter((move) => move.playerId === 1).map(move => +move.squareId);
        const p2Moves = moves.filter((move) => move.playerId=== 2).map(move => +move.squareId);

        const winningPatterns = [
            [1, 2, 3],
            [1, 5, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 5, 7],
            [3, 6, 9],
            [4, 5, 6],
            [7, 8, 9],
          ];

          let winner = null;

          winningPatterns.forEach(pattern => {
            const p1wins = pattern.every(v => p1Moves.includes(v));
            const p2wins = pattern.every(v => p2Moves.includes(v));

            if (p1wins) winner = 1;
            if (p2wins) winner = 2;
          });

          console.log(p1Moves)




        return {
            status: moves.length === 9 || winner != null? 'complete': 'in-progress', // In-progress | complete
            winner // 1 | 2 | null 
        }
    },

    init() {
      App.registerEventListeners();
    },

    registerEventListeners() {
        console.log(App.$.squares)
        // DONE
        App.$.menu.addEventListener('click', (event) => {
            App.$.menuItems.classList.toggle("hidden");
        });
        
        // TODO
        App.$.resetBtn.addEventListener('click', (event) => {
            console.log("Reset the game") 
        });
        
        // TODO
        App.$.newRoundBtn.addEventListener('click', (event) => {
            console.log("Add a new round")     
        });

        // TODO
        App.$.squares.forEach((square)=> {
            square.addEventListener("click", (event) => {            
                // Check if there is arleady a player, if so, return early
                const hasMove = (square) => {
                    const existingMove = App.state.moves.find(move => move.squareId === square);
                    return existingMove !== undefined;
                };

                if (hasMove(+square.id)) {
                    return
                }

                // Determine which icon to add to the square
                const icon = document.createElement('i');
                const lastMove = App.state.moves[App.state.moves.length - 1];
                const getOppositePlayer = (playerId) => playerId === 1 ? 2 : 1;

                const currentPlayer = 
                   App.state.moves.length === 0 
                   ? 1 
                   : getOppositePlayer(lastMove.playerId);
                
                if (currentPlayer === 1){
                    icon.classList.add('fa-solid', 'fa-x', 'yellow');               
                } else {
                    icon.classList.add('fa-solid', 'fa-o', 'turquoise');
                };

                App.state.moves.push({
                    squareId: +square.id,
                    playerId: currentPlayer
                });

                console.log(App.state.moves)

                
                square.append(icon);

                // Check if there is a winer or tie game
                const game = App.getGameStatus(App.state.moves)

                
                if (game.status === 'complete') {
                    App.$.modal.classList.remove("hidden")

                    let message = ""
                    if (game.winner) {
                        message = game.winner;
                    } else {
                        message = 'Tie'
                    }

                    App.$.modalText.textContent = message
                }
            });
        });
    },
};

window.addEventListener('load', App.init);
