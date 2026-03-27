import { Entity } from '../base/entity.js';
import { UserId } from './user-id.js';
import { Email } from './value-objects/email.js';
import { HashedPassword } from './value-objects/hashed-password.js';
import { UserCreatedEvent } from './events/user-created.event.js';

interface CreateUserProps {
  id: UserId;
  email: Email;
  hashedPassword: HashedPassword;
}

interface ReconstituteUserProps extends CreateUserProps {
  createdAt: Date;
}

export class User extends Entity<UserId> {
  private _email: Email;
  private _hashedPassword: HashedPassword;
  private _createdAt: Date;

  private constructor(
    id: UserId,
    email: Email,
    hashedPassword: HashedPassword,
    createdAt: Date,
  ) {
    super(id);
    this._email = email;
    this._hashedPassword = hashedPassword;
    this._createdAt = createdAt;
  }

  static create(props: CreateUserProps): User {
    const user = new User(props.id, props.email, props.hashedPassword, new Date());
    user.addDomainEvent(
      new UserCreatedEvent(props.id.value, props.email.value),
    );
    return user;
  }

  static reconstitute(props: ReconstituteUserProps): User {
    return new User(props.id, props.email, props.hashedPassword, props.createdAt);
  }

  get email(): Email {
    return this._email;
  }

  get hashedPassword(): HashedPassword {
    return this._hashedPassword;
  }

  get createdAt(): Date {
    return this._createdAt;
  }
}
