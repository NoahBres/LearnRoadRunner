export default class PIDController {
  kP: number;
  kI: number;
  kD: number;

  private lastTime = 0;

  private lastError = 0;
  private errorSum = 0;

  private lowerBound = 0;
  private upperBound = 0;
  private isBounded = false;

  private firstUpdate = false;

  constructor(kP: number, kI: number, kD: number) {
    this.kP = kP;
    this.kI = kI;
    this.kD = kD;
  }

  setBounds(lowerBound: number, upperBound: number) {
    this.lowerBound = lowerBound;
    this.upperBound = upperBound;

    this.isBounded = true;
  }

  update(error: number): number {
    if (!this.firstUpdate) {
      this.lastTime = performance.now();
      this.lastError = error;

      this.firstUpdate = true;

      return 0;
    }

    const now = performance.now();
    const dT = now - this.lastTime;

    this.errorSum += 0.5 * (error + this.lastError) * dT;
    const derivative = (error - this.lastError) / dT;

    this.lastError = error;
    this.lastTime = now;

    const output =
      error * this.kP + derivative * this.kD + this.errorSum * this.kI;

    if (this.isBounded)
      return Math.max(this.lowerBound, Math.min(this.upperBound, output));
    else return output;
  }

  reset() {
    this.errorSum = 0;
  }
}
