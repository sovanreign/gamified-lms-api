import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class VideosService {
  constructor(private db: DatabaseService) {}

  async create(createVideoDto: CreateVideoDto) {
    await this.db.video.create({
      data: createVideoDto,
    });
  }

  findAll() {
    return this.db.video.findMany();
  }

  async findOne(id: string) {
    await this.db.video.findUniqueOrThrow({
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
