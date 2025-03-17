import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';
import { passwordEncryption } from 'src/lib/password-encryption';
import { prismaExclude } from 'src/lib/prisma-exclude';
import { Prisma, Role } from '@prisma/client';
import * as path from 'path';
import * as fs from 'fs';

@Injectable()
export class UsersService {
  constructor(private db: DatabaseService) {}

  async uploadProfile(id: string, fileName: string) {
    const user = await this.findOne(id);

    if (user.profileUrl) {
      const oldFileName = path.basename(user.profileUrl);
      const oldFilePath = path.join(
        __dirname,
        '..',
        '..',
        'uploads',
        'profiles',
        oldFileName,
      );

      if (fs.existsSync(oldFilePath)) {
        fs.unlinkSync(oldFilePath);
      }
    }

    await this.db.user.update({
      where: { id },
      data: {
        profileUrl: `/profiles/${fileName}`,
      },
    });
  }

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

  findAll(q?: string, filterByRole?: string) {
    let where: Prisma.UserWhereInput = {};

    if (q) {
      where.OR = [
        { firstName: { contains: q, mode: 'insensitive' } },
        { lastName: { contains: q, mode: 'insensitive' } },
      ];
    }

    if (filterByRole && Object.values(Role).includes(filterByRole as Role)) {
      where.role = filterByRole as Role;
    }

    return this.db.user.findMany({
      where,
      include: {
        teacher: true,
      },
    });
  }

  findOne(id: string) {
    return this.db.user.findUniqueOrThrow({
      where: { id },
      include: {
        teacher: true,
        StudentActivity: true,
        StudentLesson: true,
      },
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
    const user = await this.findOne(id);

    if (user.profileUrl) {
      const filePath = path.join(
        __dirname,
        '..',
        '..',
        'uploads',
        'profiles',
        path.basename(user.profileUrl),
      );

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await this.db.user.delete({
      where: { id },
    });
  }

  async removeUserActivities(userId: string) {
    console.log('YES');

    await this.db.studentActivity.deleteMany({
      where: { studentId: userId },
    });
  }
}
