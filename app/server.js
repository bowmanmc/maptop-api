'use strict';

import Good from 'good';
import Hapi from 'hapi';
import Vision from 'vision';
import Inert from 'inert';

import Config from './config';
import Routes from './routes';


const server = new Hapi.Server({
    connections: {
        routes: {
            cors: {
                origin: ['*'],
                additionalHeaders: ['Accept', 'Authorization', 'Content-Type', 'If-None-Match', 'Accept-language']
            }
        }
    }
});

server.connection({
    host: '0.0.0.0',
    port: 8080
});

const loggingConfig = {
    // see https://github.com/hapijs/good
    ops: {
        interval: 1000
    },
    reporters: {
        myConsoleReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ log: '*', response: '*' }]
        }, {
            module: 'good-console'
        },
        'stdout']
    }
};

server.route(Routes);

server.register([{
        register: Good,
        options: loggingConfig
}, Vision, Inert
], (err) => {
    if (err) {
        throw err;
    }

    server.start((err) => {
        if (err) {
            return console.error(err);
        }
        console.log('Server running at: ' + server.info.uri);
    });
});
