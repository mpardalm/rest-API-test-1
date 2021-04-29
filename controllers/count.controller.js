/*
 * Created Date: Wednesday, April 28th 2021
 * Author: Miguel Pardal
 * Email: mpardalm.developer@gmail.com
 * Alias: mpardalm
 * -----
 */
const { response } = require('express');
const redis = require('redis');
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const getCount = (req, res = response) => {
    try {
        const client = redis.createClient(REDIS_PORT);
        client.get('count', (err, data) => {
            if (err) throw err;
            res.status(200).json({
                data
            });
        });

    } catch (error) {
        res.json({
            'data': 'No value found'
        });
    }

}

module.exports = {
    getCount
}