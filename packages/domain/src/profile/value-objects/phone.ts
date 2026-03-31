import { ValueObject } from '../../base/value-object.js';
import { InvalidPhoneError } from '../errors/invalid-phone.error.js';

const PHONE_REGEX = /^\+?[\d\s\-()]{7,20}$/;

export class Phone extends ValueObject<{ value: string }> {
  static create(raw: string): Phone {
    const trimmed = raw.trim();
    if (!PHONE_REGEX.test(trimmed)) {
      throw new InvalidPhoneError(trimmed);
    }
    return new Phone({ value: trimmed });
  }

  get value(): string {
    return this.props.value;
  }
}
