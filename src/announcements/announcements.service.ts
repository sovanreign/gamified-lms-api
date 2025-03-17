import { Injectable } from '@nestjs/common';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class AnnouncementsService {
  constructor(private db: DatabaseService) {}

  create(createAnnouncementDto: CreateAnnouncementDto) {
    return this.db.announcement.create({
      data: createAnnouncementDto,
    });
  }

  findAll() {
    return this.db.announcement.findMany({
      include: {
        author: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} announcement`;
  }

  update(id: string, updateAnnouncementDto: UpdateAnnouncementDto) {
    return this.db.announcement.update({
      where: { id },
      data: updateAnnouncementDto,
    });
  }

  remove(id: string) {
    return this.db.announcement.delete({ where: { id } });
  }
}
