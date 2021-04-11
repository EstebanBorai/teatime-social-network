import Mapper from '../../../common/ddd/mapper';
import User from '../domain/entity/user';
import UserEmail from '../domain/entity/value-object/user-email';
import UserPassword from '../domain/entity/value-object/user-password';
import UserDTO from '../domain/dto';

export interface UsersTableRow {
  id: string;
  email: string;
  password: string;
}

export interface UserPresentation {
  id: string;
  email: string;
}

const UserMapper: Mapper<User, UserDTO, UsersTableRow, UserPresentation> = {
  intoDTO(domain: User): UserDTO {
    return {
      email: domain.email.value,
    };
  },
  intoStoreItem(domain: User): UsersTableRow {
    return {
      id: domain.userId.idValue(),
      email: domain.email.value,
      password: domain.password.value,
    };
  },
  intoDomain(raw: Record<string, unknown>): User {
    const userEmail = UserEmail.fromString(raw.email as string);
    const userPassword = UserPassword.fromString(raw.password as string);
    const user = User.create(
      {
        email: userEmail,
        password: userPassword,
      },
      raw.id as string,
    );

    return user;
  },
  intoPresentation(domain: User): UserPresentation {
    return {
      id: domain.userId.idValue(),
      email: domain.email.value,
    };
  },
};

export default UserMapper;
