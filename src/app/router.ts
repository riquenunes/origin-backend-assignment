import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import CalculateScoreUseCase from '../domain/use-cases/CalculateScoreUseCase';
import UserProfile from '../domain/UserProfile';

export const buildRouter = (riskCalculatorUseCase: CalculateScoreUseCase) => (app: FastifyInstance) => {
  return app.post('/', async ({ body }: FastifyRequest<{ Body: any }>, reply: FastifyReply) => {
    const userProfile = new UserProfile(
      body.age,
      body.dependents,
      body.income,
      body.marital_status,
      body.risk_questions,
      body.house && {
        ownershipStatus: body.house.ownership_status,
      },
      body.vehicle,
    );

    const response = riskCalculatorUseCase.execute(userProfile);

    reply.status(200).send(response);
  });
}
