import * as Hapi from "@hapi/hapi";
import {Server, Request} from "@hapi/hapi";
import { fileURLToPath } from 'url';
import * as path from 'path';

const __filename = fileURLToPath(import.meta.url);
const rootDir = path.resolve(path.dirname(__filename), '../..');

export let server: Server;

export const init = async function(): Promise<Server> {
    server = Hapi.server({
        port: 4000,
        host: '0.0.0.0'
    });

    server.route({
        method: 'GET',
        path: '/ledger',
        handler(request) {
            return '';
        }
    });

    server.route({
        method: 'GET',
        path: '/new-game',
        handler(request) {
            return '';
        }
    });

    return server;
};

export const start = async function (): Promise<void> {
    console.log(`Listening on ${server.settings.host}:${server.settings.port}`);
    return server.start();
};

process.on('unhandledRejection', (err) => {
    console.error("unhandledRejection");
    console.error(err);
    process.exit(1);
});