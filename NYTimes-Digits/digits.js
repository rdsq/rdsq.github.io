const history = [];
const active = [true, true, true, true, true, true];
let ended = false;

let selected_digit = -1;
let selected_action = -1;

const actions = [
    '+', '-', '*', '/'
];

const digits_table = [];
const actions_table = [];


for (let r = 0; r < 2; r++) {
    digits_table.push('<tr>');
    for (let d = 0; d < 3; d++) {
        const i = (3 * r) + d;
        digits_table.push(
            '<td class="digits-td"><button class="digits-button" id="digits-button-'+i+'" onclick="digit_select('+i+')" style="background-color: '+not_selected_digit+';">'+digits[i]+'</button></td>'
        );
    }
    digits_table.push('</tr>');
}


actions_table.push('<tr>')

let content;
let el_id;
let color;
for (let i = 0; i < 5; i++) {
    if (i == 0) {
        content = '‹';
        el_id = 'back';
        color = selected_action_c;
    } else {
        content = actions[i - 1];
        el_id = i - 1;
        color = not_selected_action;
    }
    actions_table.push(
        '<td class="actions-td"><button class="actions-button" id="actions-button-'+el_id+'" onclick="action_select('+ (typeof(el_id) == 'string'? '\'' + el_id + '\'': el_id) + ')" style="background-color: '+color+';">'+content+'</button></td>'
    )
}

actions_table.push('</tr>')


document.getElementById('goal').innerHTML = goal;
document.getElementById('digits').innerHTML = digits_table.join('\n');
document.getElementById('actions').innerHTML = actions_table.join('\n');


function action_by_num(action, n1, n2) {
    switch (action) {
        case 0:
            return n1 + n2;
        case 1:
            return n1 - n2;
        case 2:
            return n1 * n2;
        case 3:
            return n1 / n2;
    }
}


function select(digit, index) {
    let el_id, color;
    if (digit) {
        el_id = 'digits';
        color = selected_digit_c;
    } else {
        el_id = 'actions';
        color = selected_action_c;
    }
    const d = document.getElementById(el_id + '-button-' + index).style;
    d.backgroundColor = color;
    if (digit) {
        selected_digit = index;
        d.borderStyle = 'none'
    } else {
        selected_action = index;
    }
}


function unselect(digit, index=-1) {
    if (index == -1) {
        index = digit? selected_digit: selected_action
    }
    let el_id, color;
    if (digit) {
        el_id = 'digits';
        color = not_selected_digit;
    } else {
        el_id = 'actions';
        color = not_selected_action;
    }
    d = document.getElementById(el_id + '-button-' + index).style;
    d.backgroundColor = color;
    if (digit) {
        selected_digit = -1;
        d.borderStyle = 'dashed';
    } else {
        selected_action = -1;
    }
}


function digit_select(index) {
    if (!ended) {
        if (selected_digit == index) {
            unselect(true);
            if (selected_action != -1) {
                unselect(false);
            }
        }  else if (selected_action == -1) {
            if (selected_digit != -1) {
                unselect(true)
            }
            select(true, index);
        } else {
            function get(id, digits_button=true) {
                return document.getElementById((digits_button?'digits-button-':'') + id);
            }
            const sdi = parseInt(get(selected_digit).innerHTML);
            const ii = parseInt(get(index).innerHTML);
            if ((selected_action == 3 && sdi % ii == 0) || selected_action != 3) {
                const r = action_by_num(selected_action, sdi, ii);
                get(index).innerHTML = r;
                get(selected_digit).style.display = 'none';
                active[selected_digit] = false;
                history.push([[selected_digit, sdi], [index, ii]]);
                if (r == goal) {
                    get('goal', false).innerHTML = goal + '<br>You win';
                    ended = true;
                }
            }
            unselect(true);
            unselect(false);
        }
    }
}

function action_select(index) {
    if (!ended) {
        if (index == 'back') {
            if (history.length > 0) {
                for (let i = 0; i < 2; i++) {
                    const e = history[history.length - 1][i];
                    const k = e[0];
                    const v = e[1];
                    const d = document.getElementById('digits-button-' + k);
                    d.innerHTML = v;
                    if (!active[k]) {
                        d.style.display = 'block';
                    }
                    digits[k] = v;
                }
                history.splice(-1, 1);
            }
        } else {
            if (selected_digit == -1) {} else
            if (selected_action == index) {
                unselect(false)
            } else {
                if (selected_action != -1) {
                    unselect(false);
                }
                select(false, index);
            }
        }
    }
}
