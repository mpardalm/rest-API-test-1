/*
 * Created Date: Wednesday, April 28th 2021
 * Author: Miguel Pardal
 * Email: mpardalm.developer@gmail.com
 * Alias: mpardalm
 * -----
 */
const { getCount } = require('./count.controller');
const { postTrack } = require('./track.controller');

module.exports = {
    getCount,
    postTrack
}