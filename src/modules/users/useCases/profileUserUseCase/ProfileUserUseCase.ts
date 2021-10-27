import { inject, injectable } from "tsyringe";

import { IUserResponseDTO } from "@modules/users/dtos/IUserResponseDTO";
import { AppError } from "@shared/errors/AppError";
import { UserMap } from "@modules/users/mapper/UserMap";
import { ICacheProvider } from "@shared/container/providers/CacheProvider/ICacheProvider";
import { User } from "@modules/users/infra/typeorm/entities/User";

@injectable()
class ProfileUserUseCase {
  constructor(
    @inject("RedisCacheProvider")
    private cacheProvider: ICacheProvider,
  ){}

  async execute(id: string): Promise<IUserResponseDTO> {
    console.time();
    
    const user_cache = await this.cacheProvider.recover(`users-${id}`) as User;

    console.timeEnd()

    if (!user_cache) {
      throw new AppError("User not found", 404);
    }

    return UserMap.toDTO(user_cache);
  }
}

export {ProfileUserUseCase}