import { describe, it, expect } from 'vitest';
import { User } from './user.entity.js';
import { UserId } from './user-id.js';
import { Email } from './value-objects/email.js';
import { HashedPassword } from './value-objects/hashed-password.js';
import { UserCreatedEvent } from './events/user-created.event.js';

describe('User', () => {
  const makeProps = () => ({
    id: UserId.generate(),
    email: Email.create('test@example.com'),
    hashedPassword: HashedPassword.fromHashed('hashed-value'),
  });

  it('should create a user and emit UserCreatedEvent', () => {
    const props = makeProps();
    const user = User.create(props);

    expect(user.id).toBe(props.id);
    expect(user.email.value).toBe('test@example.com');
    expect(user.domainEvents).toHaveLength(1);
    expect(user.domainEvents[0]).toBeInstanceOf(UserCreatedEvent);
  });

  it('should reconstitute without emitting events', () => {
    const props = { ...makeProps(), createdAt: new Date('2025-01-01') };
    const user = User.reconstitute(props);

    expect(user.id).toBe(props.id);
    expect(user.createdAt).toEqual(new Date('2025-01-01'));
    expect(user.domainEvents).toHaveLength(0);
  });

  it('should expose hashedPassword', () => {
    const props = makeProps();
    const user = User.create(props);
    expect(user.hashedPassword.value).toBe('hashed-value');
  });
});
