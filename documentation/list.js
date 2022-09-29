const fs = require('fs');
module.exports = (req, res) => {
    let dirPath = 'documentation/files'
    let html = `<html><body><ul>`;
    fs.readdirSync(dirPath).forEach(file => {
        html += `<li><a href='${file}'>${file}</a></li>`
    });
    html += `</ul></body></html>`
    res.send(html);
}