import { randomUUID } from 'node:crypto';
import { ValueObject } from './value-object.js';

export abstract class Identifier extends ValueObject<{ value: string }> {
  get value(): string {
    return this.props.value;
  }

  static generateUUID(): string {
    return randomUUID();
  }

  toString(): string {
    return this.props.value;
  }
}
