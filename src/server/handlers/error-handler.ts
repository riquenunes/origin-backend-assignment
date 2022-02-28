import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';
import ValidationError from '../../domain/errors/ValidationError';

export default function errorHandler(error: Error, request: FastifyRequest, reply: FastifyReply) {
  const responseObject = {
    type: error.constructor.name,
    message: error.message
  };

  if (error instanceof ValidationError) {
    reply.status(StatusCodes.BAD_REQUEST).send(responseObject);

    return;
  }

  reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send(responseObject);
}
