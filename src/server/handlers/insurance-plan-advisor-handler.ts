import { FastifyRequest, FastifyReply } from 'fastify';
import InsurancePlanAdvisor from '../../application/InsurancePlanAdvisor';
import UserProfile from '../../domain/UserProfile';

export const buildHandler = (insurancePlanAdvisor: InsurancePlanAdvisor) => (
  request: FastifyRequest<{ Body: Record<string, any> }>,
  reply: FastifyReply
) => {
  const { body } = request;
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

  const response = insurancePlanAdvisor.getIdealInsurancePlans(userProfile);

  reply.status(200).send(response);
}
