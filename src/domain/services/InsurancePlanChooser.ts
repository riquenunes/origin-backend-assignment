import RiskProfile from '../RiskProfile';
import RiskProfileProcessor from './RiskProfileProcessor';

export enum InsurancePlan {
  Economic = 'economic',
  Regular = 'regular',
  Responsible = 'responsible',
  Inelegible = 'inelegible',
}

export default class InsurancePlanChooser implements RiskProfileProcessor<InsurancePlan> {
  process({ isElegible, riskScore }: RiskProfile): InsurancePlan {
    if (!isElegible) return InsurancePlan.Inelegible;
    if (riskScore <= 0) return InsurancePlan.Economic;
    if (riskScore <= 2) return InsurancePlan.Regular;

    return InsurancePlan.Responsible;
  }
}
