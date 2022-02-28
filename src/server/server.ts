import fastify from 'fastify';
import errorHandler from './handlers/error-handler';
import { buildHandler } from './handlers/insurance-plan-advisor-handler';

export const buildServer = (container) => {
  const server = fastify({ logger: process.env.NODE_ENV !== 'test' });
  const insuranceAdvisorHandler = buildHandler(container.riskCalculatorUseCase);

  server
    .post('/', insuranceAdvisorHandler)
    .setErrorHandler(errorHandler);

  return server;
}
