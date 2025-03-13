import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';
import { passwordEncryption } from 'src/lib/password-encryption';
import { prismaExclude } from 'src/lib/prisma-exclude';

@Injectable()
export class UsersService {
  constructor(private db: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    const { password, ...data } = createUserDto;

    const hashedPassword = await passwordEncryption(password);

    await this.db.user.create({
      data: {
        password: hashedPassword,
        ...data,
      },
    });
  }

  findAll() {
    return this.db.user.findMany({
      select: prismaExclude('User', ['password']),
    });
  }

  findOne(id: string) {
    return this.db.user.findUniqueOrThrow({
      where: { id },
      select: prismaExclude('User', ['password']),
    });
  }

  findOneByUsername(username: string) {
    return this.db.user.findFirst({
      where: { username },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await passwordEncryption(updateUserDto.password);
    }

    await this.db.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string) {
    await this.db.user.delete({
      where: { id },
    });
  }
}
