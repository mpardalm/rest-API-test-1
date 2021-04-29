/*
 * Created Date: Wednesday, April 28th 2021
 * Author: Miguel Pardal
 * Email: mpardalm.developer@gmail.com
 * Alias: mpardalm
 * -----
 */
require('dotenv').config();
const { Server } = require('./models');

const server = new Server();
server.listen();