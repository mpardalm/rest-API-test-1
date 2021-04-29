/*
 * Created Date: Wednesday, April 28th 2021
 * Author: Miguel Pardal
 * Email: mpardalm.developer@gmail.com
 * Alias: mpardalm
 * -----
 */
const cors = require('cors');
const express = require('express');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080;

        this.paths = {
            track: '/track',
            count: '/count'
        }

        this.middlewares();
        this.routes();
    }

    routes() {
        this.app.use(this.paths.count, require('../routes/count.routes'));
        this.app.use(this.paths.track, require('../routes/track.routes'));
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Parse and Read body
        this.app.use(express.json());
    }

    listen() {
        this.app.listen(this.port);
    }
}

module.exports = Server;