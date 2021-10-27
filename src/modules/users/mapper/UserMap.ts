import { classToClass } from "class-transformer";
import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/typeorm/entities/User";


class UserMap {
  static toDTO({ id, name, login_github, avatar_url, email, created_at, updated_at }: User): IUserResponseDTO {
    const user = classToClass({
      id,
      name,
      login_github,
      avatar_url,
      email,
      created_at,
      updated_at,
    });

    return user;
  }
}

export { UserMap }