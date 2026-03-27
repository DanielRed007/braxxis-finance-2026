import { ValueObject } from '../../base/value-object.js';
import { InvalidEmailError } from '../errors/invalid-email.error.js';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export class Email extends ValueObject<{ value: string }> {
  static create(raw: string): Email {
    const trimmed = raw.trim().toLowerCase();
    if (!EMAIL_REGEX.test(trimmed)) {
      throw new InvalidEmailError(raw);
    }
    return new Email({ value: trimmed });
  }

  get value(): string {
    return this.props.value;
  }
}
