import RiskCalculationResult from '../RiskCalculationResult';
import RiskScoreProcessor from './RiskCalculationResultProcessor';

export enum InsurancePlan {
  Economic = 'economic',
  Regular = 'regular',
  Responsible = 'responsible',
  Inelegible = 'inelegible',
}

export default class InsurancePlanChooser implements RiskScoreProcessor<InsurancePlan> {
  process({ isElegible, riskScore }: RiskCalculationResult): InsurancePlan {
    if (!isElegible) return InsurancePlan.Inelegible;
    if (riskScore <= 0) return InsurancePlan.Economic;
    if (riskScore <= 2) return InsurancePlan.Regular;

    return InsurancePlan.Responsible;
  }
}
