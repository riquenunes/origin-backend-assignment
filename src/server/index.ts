import * as container from '../infrastructure/container';
import { buildServer } from './server';

const server = buildServer(container);

server.listen(1337, '0.0.0.0');
process.on('SIGINT', () => server.close());
