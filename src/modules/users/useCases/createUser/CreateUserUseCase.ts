import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";

import { AppError } from "@shared/errors/AppError";
import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { UserMap } from "@modules/users/mapper/UserMap";
import { IUserResponseDTO } from "@modules/users/dtos/IUserResponseDTO";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { ICacheProvider } from "@shared/container/providers/CacheProvider/ICacheProvider";
import { User } from "@modules/users/infra/typeorm/entities/User";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("RedisCacheProvider")
    private cacheProvider: ICacheProvider,
  ) { }

  async execute({ name, login_github, email, password }: ICreateUserDTO): Promise<IUserResponseDTO> {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User already exists");
    }

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create({ name, login_github, email, password: passwordHash });

    await this.cacheProvider.save(`users-${user.id}`, UserMap.toDTO(user));

    return UserMap.toDTO(user);
  }
}

export { CreateUserUseCase };
