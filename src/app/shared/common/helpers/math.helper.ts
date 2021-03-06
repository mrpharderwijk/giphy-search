export class MathHelper {
  /**
   * Rounds a number by the scale/decimals given
   * @param {number} num to round
   * @param {number} scale decimals behind the comma
   */
  static roundNumber(num: number, scale: number): number {
    return +`${Math.round(Number(`${num}e+${scale}`))}e-${scale}`;
  }

  /**
   * TODO: test this function and implement in inputGuid for forms
   * Returns a random number string
   * @param {number} length lucky number ;-)
   */
  static randomNumber(length: number = 13): string {
    return (
      Math.random()
        .toString(length * 2)
        .substring(2, length + 2) +
      Math.random()
        .toString(length * 2)
        .substring(2, length + 2)
    );
  }
}
