import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { DatabaseService } from 'src/database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class VideosService {
  constructor(private db: DatabaseService) {}

  async create(createVideoDto: CreateVideoDto) {
    await this.db.video.create({
      data: createVideoDto,
    });
  }

  findAll(q?: string) {
    let where: Prisma.VideoWhereInput = {};

    if (q) {
      where.OR = [{ name: { contains: q, mode: 'insensitive' } }];
    }

    return this.db.video.findMany({
      where,
      orderBy: {
        isOpen: 'desc',
      },
    });
  }

  async findOne(id: string) {
    return await this.db.video.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: string, updateVideoDto: UpdateVideoDto) {
    await this.db.video.update({
      where: { id },
      data: updateVideoDto,
    });
  }

  async remove(id: string) {
    await this.db.video.delete({
      where: { id },
    });
  }
}
