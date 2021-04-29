
/*
* Created Date: Thursday, April 29th 2021
* Author: Miguel Pardal
* Email: mpardalm.developer@gmail.com
* Alias: mpardalm
* -----
*/
const { request, response } = require("express");
const { checkBody, saveJSONFile } = require("../helpers/utils.helpers");

const postTrack = async (req = request, res = response) => {
    await checkBody(req);
    saveJSONFile(req, res);
}

module.exports = {
    postTrack
}