import fastify, { FastifyPluginCallback, FastifyPluginOptions } from 'fastify';
import process from 'process';

export const buildServer = (routerPlugin: FastifyPluginCallback<FastifyPluginOptions>) => {
  const server = fastify({ logger: true });

  server.register(routerPlugin);

  return server;
}
