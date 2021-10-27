import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { getRepository } from "typeorm";

import { User } from "../entities/User";

class UsersRepository implements IUsersRepository {
  private repository = getRepository(User);

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.findOne(id);

    return user;
  }

  async create({ name, login_github, email, password }: ICreateUserDTO): Promise<User> {
    const user = this.repository.create({ name, login_github, email, password });

    await this.repository.save(user);

    return user;
  }
}

export { UsersRepository };
