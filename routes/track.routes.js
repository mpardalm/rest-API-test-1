/*
 * Created Date: Wednesday, April 28th 2021
 * Author: Miguel Pardal
 * Email: mpardalm.developer@gmail.com
 * Alias: mpardalm
 * -----
 */
const { Router } = require('express');
const { postTrack } = require('../controllers');
const { isBodyValid } = require('../middlewares');

const router = Router();

router.post('/', [
    isBodyValid
], postTrack);

module.exports = router;