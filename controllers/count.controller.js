/*
 * Created Date: Wednesday, April 28th 2021
 * Author: Miguel Pardal
 * Email: mpardalm.developer@gmail.com
 * Alias: mpardalm
 * -----
 */
const { response } = require('express');
const { getRedisCount } = require('../helpers/utils.helpers');


const getCount = async (req, res = response) => {
    const count = await getRedisCount();
    res.json({
        count
    });

}

module.exports = {
    getCount
}