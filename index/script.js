let indexJson;

function download(index, archive = false) {
    const data = indexJson[archive ? 'archive' : 'pages'][index];
    downloadPage(data[1], data[2]);
    return false;
}

function elementsFill(element, list, additional, archive = false) {
    for (let i = 0; i < list.length; i++) {
        const a = document.createElement('a');
        a.innerText = list[i][0];
        a.href = list[i][1];
        additional(a, i);
        const downloadE = document.createElement('a');
        downloadE.href = a.href;
        downloadE.innerText = 'Download';
        downloadE.onclick = () => { return download(i, archive) };
        a.appendChild(downloadE);
        document.getElementById(element).appendChild(a);
    }
}

fetch('index/index.json').then(content => {
    return content.json();
}).then(data => {
    indexJson = data;
    elementsFill('pages', data.pages, (e, i) => {});
    elementsFill('archive-pages', data.archive, (e, i) => {}, true);
})

function openArchive() {
    document.getElementById('archive-box').style.display = 'block';
    window.location.hash = '#archive';
}

function closeArchive () {
    document.getElementById('archive-box').style.display = 'none';
    window.location.hash = '';
}

if (window.location.hash) {
    openArchive();
}