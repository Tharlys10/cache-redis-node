import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import auth from "@config/auth";
import { IAuthenticateResponseDTO } from "@modules/session/dtos/IAuthenticateResponseDTO";

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute(email: string, password: string): Promise<IAuthenticateResponseDTO> {
    const { secret_token, expires_in_token } = auth;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("E-mail ou password incorrect");
    }

    const comparePassword = await compare(password, user.password);

    if (!comparePassword) {
      throw new AppError("E-mail ou password incorrect");
    }

    const token = sign({ email: user.email }, secret_token, {
      subject: user.id,
      expiresIn: expires_in_token
    });

    const authenticate: IAuthenticateResponseDTO = {
      token,
      user: {
        name: user.name,
        email: user.email,
      }
    }

    return authenticate;
  }
}

export { AuthenticateUserUseCase }