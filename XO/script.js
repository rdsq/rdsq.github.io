const game = new XO();

for (let y = 0; y < game.yl; y++) {
    const tr = document.createElement('tr');
    for (let x = 0; x < game.xl; x++) {
        const td = document.createElement('td');
        td.innerText = ' ';
        td.onclick = event => { play(y, x) };
        tr.appendChild(td);
    }
    document.getElementById('game').appendChild(tr);
    updateTurn('Turn: ' + game.players[game.turn]);
}

function updateTurn(turn) {
    document.getElementById('turn').innerText = turn;
}

function play(y, x) {
    const result = game.play(y, x);
    if (result) {
        document.getElementById('game').children[y].children[x].innerText = game.players[game.board[y][x]];
        updateTurn('Turn: ' + game.players[game.turn]);
        if (game.win != -2) {
            updateTurn((game.win == -1) ? 'Win: none' : 'Win: ' + game.players[game.win]);
            document.getElementById('restart').style.display = 'block';
        }
    } else {
        if (game.win == -2) {
            alert('This cell is occupied');
        } else {
            alert('The game was ended');
        }
    }
}

function restart() {
    game.restart();
    document.getElementById('restart').style.display = 'none';
    const e = document.getElementById('game');
    for (const tr of e.children) {
        for (const td of tr.children) {
            td.innerText = ' ';
        }
    }
}