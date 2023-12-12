let g = new XO(3, 3, 3, ['_', 'X', 'O']);

function message(towrite) {
    document.getElementById('message').innerHTML = towrite;
    document.getElementById('message').style.display = "inline-block";
}

function reload() {
    document.getElementById('field').innerHTML = g.text_render();
    document.getElementById('inp-field').placeholder = 'Y and X...';
    document.getElementById('char').innerHTML = g.characters[g.turn];
}

function submit_pos() {
    let inp = document.getElementById('inp-field').value;
    document.getElementById('inp-field').value = '';
    let inps = inp.split(' ');
    let p = g.play(Number(inps[0]), Number(inps[1]));
    reload();
    if (p != 'OK') {
        window.alert(p)
    }
    if (!g.running) {
        if (g.win == 0) {
            message('Nobody won')
        } else {
            message(g.characters[g.win] + ' won')
        }
    }
    return false;
}

function start() {
    document.getElementById('message').style.display = "none";
    reload();
}

function restart() {
    g.restart();
    start();
}



start()

let input = document.getElementById('inp-field');

input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("inp-button").click();
    }
})