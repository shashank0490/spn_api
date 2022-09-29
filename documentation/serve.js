const fs = require('fs');
const showdown = require('showdown')
module.exports = (req, res) => {
    let dirPath = 'documentation/files'
    let text = fs.readFileSync(`${dirPath}/${req.params.path}`)
    let converter = new showdown.Converter();
    let html = converter.makeHtml(text.toString());
    res.send(html);
}