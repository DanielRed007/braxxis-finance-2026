import { ValueObject } from '../../base/value-object.js';
import { InvalidOrderError } from '../errors/invalid-order.error.js';

export class Quantity extends ValueObject<{ value: number }> {
  static create(amount: number): Quantity {
    if (amount < 0) {
      throw new InvalidOrderError('Quantity cannot be negative');
    }
    return new Quantity({ value: amount });
  }

  get value(): number {
    return this.props.value;
  }

  add(other: Quantity): Quantity {
    return Quantity.create(this.props.value + other.props.value);
  }

  subtract(other: Quantity): Quantity {
    return Quantity.create(this.props.value - other.props.value);
  }

  isGreaterThanOrEqual(other: Quantity): boolean {
    return this.props.value >= other.props.value;
  }

  isZero(): boolean {
    return this.props.value === 0;
  }
}
