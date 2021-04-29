/*
 * Created Date: Wednesday, April 28th 2021
 * Author: Miguel Pardal
 * Email: mpardalm.developer@gmail.com
 * Alias: mpardalm
 * -----
 */
const { Router } = require('express');
const { getCount } = require('../controllers')

const router = Router();

router.get('/', getCount);

module.exports = router;