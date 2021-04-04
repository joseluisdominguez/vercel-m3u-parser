const axios = require('axios');
const parser = require('iptv-playlist-parser');
const stream = require('string-to-stream');
const { filter, forEach } = require('lodash');

module.exports = async (req, res) => {
    const { type = '04 FUTBOL' } = req.query;
    let text = '#EXTM3U\r\n';

    try {
        const dataM3u = await axios.get(process.env.URL);
        const parsed = parser.parse(dataM3u.data);
        
        const filtered = filter(parsed.items, { group: { title: type}});
        forEach(filtered, (i) => {
            text += i.raw + '\r\n';
        });
    } catch (e) {
        console.log(e);
    }

    const contentStream = stream(text);

    res.writeHead(200, {
        'Content-Type': 'application/octet-stream',
        'Content-Disposition': 'attachment; filename=' + type + '.m3u'
    });

    contentStream.pipe(res);
}