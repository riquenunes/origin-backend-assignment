import InsurancePlanAdvisor from '../../src/application/InsurancePlanAdvisor';
import InsuranceRiskCalculator from '../../src/domain/services/risk-calculators/InsuranceRiskCalculator';
import RiskProfileProcessor from '../../src/domain/services/RiskProfileProcessor';
import UserProfileDummy from '../doubles/UserProfileDummy';
import InsuranceRiskCalculatorMock from '../doubles/InsuranceRiskCalculatorMock';
import UserProfile from '../../src/domain/UserProfile';

describe('Insurance plan advisor', () => {
  let autoInsuranceRiskCalculatorMock: InsuranceRiskCalculator;
  let homeInsuranceRiskCalculatorMock: InsuranceRiskCalculator;
  let lifeInsuranceRiskCalculatorMock: InsuranceRiskCalculator;
  let disabilityInsuranceRiskCalculatorMock: InsuranceRiskCalculator;
  let rentersInsuranceRiskCalculatorMock: InsuranceRiskCalculator;
  let umbrellaInsuranceRiskCalculatorMock: InsuranceRiskCalculator;
  let riskCalculationResultProcessorMock: RiskProfileProcessor;
  let useCase: InsurancePlanAdvisor;
  let profile: UserProfile;

  beforeEach(() => {
    autoInsuranceRiskCalculatorMock = new InsuranceRiskCalculatorMock('auto');
    homeInsuranceRiskCalculatorMock = new InsuranceRiskCalculatorMock('home');
    lifeInsuranceRiskCalculatorMock = new InsuranceRiskCalculatorMock('life');
    disabilityInsuranceRiskCalculatorMock = new InsuranceRiskCalculatorMock('disability');
    rentersInsuranceRiskCalculatorMock = new InsuranceRiskCalculatorMock('renters');
    umbrellaInsuranceRiskCalculatorMock = new InsuranceRiskCalculatorMock('umbrella');
    riskCalculationResultProcessorMock = { process: jest.fn().mockImplementation((plan) => `${plan}_result`) };
    useCase = new InsurancePlanAdvisor(
      autoInsuranceRiskCalculatorMock,
      homeInsuranceRiskCalculatorMock,
      lifeInsuranceRiskCalculatorMock,
      disabilityInsuranceRiskCalculatorMock,
      rentersInsuranceRiskCalculatorMock,
      umbrellaInsuranceRiskCalculatorMock,
      riskCalculationResultProcessorMock
    );
    profile = new UserProfileDummy();
  });

  it('calls the correct risk calculator services', () => {
    useCase.getIdealInsurancePlans(profile);

    expect(autoInsuranceRiskCalculatorMock.calculate).toHaveBeenCalledWith(profile);
    expect(homeInsuranceRiskCalculatorMock.calculate).toHaveBeenCalledWith(profile);
    expect(lifeInsuranceRiskCalculatorMock.calculate).toHaveBeenCalledWith(profile);
    expect(disabilityInsuranceRiskCalculatorMock.calculate).toHaveBeenCalledWith(profile);
    expect(rentersInsuranceRiskCalculatorMock.calculate).toHaveBeenCalledWith(profile);
    expect(umbrellaInsuranceRiskCalculatorMock.calculate).toHaveBeenCalledWith(profile, [
      'auto_result',
      'home_result',
      'life_result',
      'disability_result',
      'renters_result'
    ]);
  });

  it('returns the calculation result processor result', () => {
    const result = useCase.getIdealInsurancePlans(profile);

    expect(riskCalculationResultProcessorMock.process).toHaveBeenCalledWith('auto');
    expect(riskCalculationResultProcessorMock.process).toHaveBeenCalledWith('home');
    expect(riskCalculationResultProcessorMock.process).toHaveBeenCalledWith('life');
    expect(riskCalculationResultProcessorMock.process).toHaveBeenCalledWith('disability');
    expect(riskCalculationResultProcessorMock.process).toHaveBeenCalledWith('renters');
    expect(riskCalculationResultProcessorMock.process).toHaveBeenCalledWith('umbrella');
    expect(result).toEqual({
      auto: 'auto_result',
      home: 'home_result',
      life: 'life_result',
      disability: 'disability_result',
      renters: 'renters_result',
      umbrella: 'umbrella_result',
    });
  });
});
