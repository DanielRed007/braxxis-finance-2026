import { ValueObject } from '../../base/value-object.js';

export class HashedPassword extends ValueObject<{ value: string }> {
  static fromHashed(hash: string): HashedPassword {
    if (!hash) {
      throw new Error('Hashed password cannot be empty');
    }
    return new HashedPassword({ value: hash });
  }

  get value(): string {
    return this.props.value;
  }
}
