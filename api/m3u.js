const axios = require('axios')
const parser = require('iptv-playlist-parser')
const { filter, forEach } = require('lodash');

module.exports = async (req, res) => {
    let text = '';

    try {
        const result = await axios.get(process.env.URL)
        const parsed = parser.parse(result.data)
        
        
        const filtered = filter(parsed.items, { group: { title: '04 FUTBOL'}});
        forEach(filtered, (i) => {
            text += i.raw;
        })
    } catch (e) {
        console.log(e);
    }

    res.send(text)
}