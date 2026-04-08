import { ValueObject } from '../../base/value-object.js';
import { InvalidOrderError } from '../errors/invalid-order.error.js';

export class Money extends ValueObject<{ value: number }> {
  static create(amount: number): Money {
    if (amount < 0) {
      throw new InvalidOrderError('Amount cannot be negative');
    }
    return new Money({ value: amount });
  }

  get value(): number {
    return this.props.value;
  }

  add(other: Money): Money {
    return Money.create(this.props.value + other.props.value);
  }

  subtract(other: Money): Money {
    return Money.create(this.props.value - other.props.value);
  }

  multiply(factor: number): Money {
    return Money.create(this.props.value * factor);
  }

  isGreaterThanOrEqual(other: Money): boolean {
    return this.props.value >= other.props.value;
  }
}
