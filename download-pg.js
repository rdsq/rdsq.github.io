function downloadPage(href, name) {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.sandbox = 'allow-same-origin';
    iframe.src = href;
    document.body.appendChild(iframe);
    iframe.onload = () => {
        const pr = [];
        for (let link of iframe.contentWindow.document.querySelectorAll('link')) {
            if (link.rel == 'stylesheet') {
                pr.push(fetch(link.href).then(content => {
                    return content.text();
                }).then(text => {
                    link.outerHTML = '<style>' + text + '</style>';
                }))
            }
        }
        for (let script of iframe.contentWindow.document.querySelectorAll('script')) {
            if (script.src != '') {
                pr.push(fetch(script.src).then(content => {
                    return content.text();
                }).then(text => {
                    script.outerHTML = '<script>' + text + '</script>';
                }))
            }
        }
        Promise.allSettled(pr).then(() => {
            const a = document.createElement('a');
            a.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent('<!DOCTYPE html>\n' + iframe.contentWindow.document.documentElement.outerHTML);
            a.download = name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(iframe);
            document.body.removeChild(a);
        })
    }
}