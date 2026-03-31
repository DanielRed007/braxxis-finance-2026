import { ValueObject } from '../../base/value-object.js';
import { UnderageInvestorError } from '../errors/underage-investor.error.js';

const MIN_AGE = 18;

export class DateOfBirth extends ValueObject<{ value: string }> {
  static create(raw: string): DateOfBirth {
    const dob = new Date(raw);
    const now = new Date();
    let age = now.getFullYear() - dob.getFullYear();
    const monthDiff = now.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < dob.getDate())) {
      age--;
    }
    if (age < MIN_AGE) {
      throw new UnderageInvestorError();
    }
    return new DateOfBirth({ value: raw });
  }

  get value(): string {
    return this.props.value;
  }
}
