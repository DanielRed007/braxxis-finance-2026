import { WeakPasswordError } from '../errors/weak-password.error.js';

const MIN_LENGTH = 8;
const HAS_UPPERCASE = /[A-Z]/;
const HAS_LOWERCASE = /[a-z]/;
const HAS_DIGIT = /\d/;

export class Password {
  private constructor(private readonly _value: string) {}

  static create(raw: string): Password {
    if (
      raw.length < MIN_LENGTH ||
      !HAS_UPPERCASE.test(raw) ||
      !HAS_LOWERCASE.test(raw) ||
      !HAS_DIGIT.test(raw)
    ) {
      throw new WeakPasswordError();
    }
    return new Password(raw);
  }

  get value(): string {
    return this._value;
  }
}
