class XO {
    constructor(yl=3, xl=3, players=['X', 'O'], lfw=3) {
        this.yl = yl;
        this.xl = xl;
        this.players = players;
        this.lfw = lfw;
        this.restart();
    }
    restart() {
        this.board = [];
        for (let y = 0; y < this.yl; y++) {
            this.board.push([]);
            for (let x = 0; x < this.xl; x++) {
                this.board[y].push(-1);
            }
        }
        this.turn = 0;
        this.win = -2;
        this.moves = 0;
    }
    checkCell(y, x) {
        return y > this.yl - 1 || y < 0 || x > this.xl || x < 0;
    }
    check(y, x) {
        const player = this.board[y][x];
        const directions = [
            [0, 1],
            [1, 1],
            [1, 0],
            [1, -1],
            [0, -1],
            [-1, -1],
            [-1, 0],
            [-1, 1]
        ]
        const lines = [];
        for (let i = 0; i < 4; i++) {
            lines.push(1);
        }
        let ny, nx, l;
        for (let d = 0; d < 8; d++) {
            l = (d < 4) ? d : d - 4;
            for (let i = 1; i < this.lfw; i++) {
                ny = y + directions[d][0] * i;
                nx = x + directions[d][1] * i;
                if (this.checkCell(ny, nx)) {
                    break;
                }
                if (this.board[ny][nx] == player) {
                    lines[l]++;
                } else {
                    break;
                }
            }
        }
        if (lines.some(element => element === this.lfw)) {
            this.win = player;
            return true;
        }
        if (this.yl* this.xl == this.moves) {
            this.win = -1;
            return true;
        }
        return false;
    }
    play(y, x) {
        if (this.win != -2) {
            return false;
        }
        if (this.checkCell(y, x) || this.board[y][x] != -1) {
            return false;
        }
        this.moves++;
        this.board[y][x] = this.turn;
        this.turn++;
        if (this.turn > this.players.length - 1) {
            this.turn = 0;
        }
        this.check(y, x)
        return true;
    }
}