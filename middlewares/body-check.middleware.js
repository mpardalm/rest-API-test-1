/*
 * Created Date: Thursday, April 29th 2021
 * Author: Miguel Pardal
 * Email: mpardalm.developer@gmail.com
 * Alias: mpardalm
 * -----
 */
const { request, response } = require('express');

const isBodyValid = (req = request, res = response, next) => {
    if (!Object.keys(req.body).length) {
        return res.status(400).json({
            message: 'Empty body'
        });
    }
    next();
}

module.exports = {
    isBodyValid
}