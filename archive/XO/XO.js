class XO {
    optimizations = true;
    directions = [
        [0, 1],
        [1, 1],
        [1, 0],
        [1, -1],
        [0, -1],
        [-1, -1],
        [-1, 0],
        [-1, 1]
    ];
    constructor(yl, xl, lfw, characters) {
        this.yl = yl;
        this.xl = xl;
        this.lfw = lfw;
        this.characters = characters;
        this.restart();
    }
    restart() {
        this.win = 0;
        this.running = true;
        this.turn = 1;
        this.moves = 0;
        if (this.yl <= 0 || this.xl <= 0) {
            this.yl = 0;
            this.xl = 0;
            this.win = 0;
            this.running = false;
        }
        if (this.characters.length <= 1) {
            this.win = 0;
            this.running = false;
        } else if (this.lfw <= 0) {
            this.win = 1;
            this.running = false;
        }
        this.field = [];
        for (let y = 0; y < this.yl; y++) {
            this.field.push([])
            for (let x = 0; x < this.xl; x++) {
                this.field[y].push(0)
            }
        }
    }
    search(y, x) {
        function endgame(win, t) {
            t.win = win;
            t.running = false;
            return t.running;
        }
        if (this.lfw <= 1) {
            return endgame(this.turn)
        }
        if (!this.optimizations || this.moves > (this.lfw - 1) * (this.characters.length - 1)) {
            const me = this.field[y][x];
            const lines = [1, 1, 1, 1];
            let forline, py, px;
            for (let d = 0; d < this.directions.length; d++) {
                forline = (d > 3) ? d - 4:d;
                for (let i = 1; i < this.lfw; i++) {
                    py = y + this.directions[d][0] * i;
                    px = x + this.directions[d][1] * i;
                    if (py > this.yl - 1 || py < 0 || px > this.xl - 1 || px < 0 || this.field[py][px] != me) {
                        break;
                    }
                    lines[forline]++;
                    if (lines[forline] >= this.lfw) {
                        return endgame(me, this);
                    }
                }
            }
        }
        if (this.moves >= this.yl * this.xl) {
            return endgame(0, this);
        }
    }
    play(y, x) {
        y--;
        x--;
        if (!this.running) {
            return 'The game is not running';
        } else if (y > this.yl - 1 || y < 0 || x > this.xl - 1 || x < 0) {
            return 'Out of field';
        } else if (this.field[y][x] != 0) {
            return 'This cell is occupied'
        }
        this.field[y][x] = this.turn;
        this.moves++;
        this.turn++;
        if (this.turn > this.characters.length - 1) {
            this.turn = 1;
        }
        this.search(y, x)
        return 'OK';
    }
    text_render(new_line = '<br>') {
        const result = [];
        for (let y = 0; y < this.yl; y++) {
            let line = [];
            for (let x = 0; x < this.xl; x++) {
                line.push(this.characters[this.field[y][x]])
            }
            result.push(line.join(' '));
        }
        return result.join(new_line);
    }
}