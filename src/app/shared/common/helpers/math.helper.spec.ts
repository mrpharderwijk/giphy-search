import { MathHelper } from './math.helper';

describe('mathHelper', () => {
  it('should round a given number with decimals', () => {
    const originalNumber = 35.66;
    const roundedNumber = MathHelper.roundNumber(originalNumber, 1);
    expect(roundedNumber).toBe(35.7);

    const roundedNumber2 = MathHelper.roundNumber(originalNumber, 0);
    expect(roundedNumber2).toBe(36);
  });

  it('should produce a random number', () => {
    const randomNumber1 = MathHelper.randomNumber();
    const randomNumber2 = MathHelper.randomNumber();
    expect(randomNumber1).not.toEqual(randomNumber2);
    expect(randomNumber1).toEqual(jasmine.any(String));
    expect(randomNumber2).toEqual(jasmine.any(String));
  });
});
