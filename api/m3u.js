const axios = require('axios')
const parser = require('iptv-playlist-parser')
const { filter, forEach } = require('lodash');

module.exports = async (req, res) => {
    const { type = '04 FUTBOL' } = req.query;
    let text = '';

    try {
        const dataM3u = await axios.get(process.env.URL);
        const parsed = parser.parse(dataM3u.data);
        
        const filtered = filter(parsed.items, { group: { title: type}});
        forEach(filtered, (i) => {
            text += i.raw + '\n';
        });
    } catch (e) {
        console.log(e);
    }

    res.send(text);
}