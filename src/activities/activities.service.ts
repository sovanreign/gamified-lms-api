import { Injectable } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { DatabaseService } from 'src/database/database.service';
import { ActivityCompletedDto } from './dto/activity-completed.dto';

@Injectable()
export class ActivitiesService {
  constructor(private db: DatabaseService) {}

  async markAsDone(body: ActivityCompletedDto) {
    await this.db.studentActivity.create({
      data: body,
    });
  }

  create(createActivityDto: CreateActivityDto) {
    return 'This action adds a new activity';
  }

  findAll() {
    return this.db.activity.findMany();
  }

  findOne(id: string) {
    return this.db.activity.findUniqueOrThrow({
      where: { id },
    });
  }

  async update(id: string, updateActivityDto: UpdateActivityDto) {
    await this.db.activity.update({
      where: { id },
      data: updateActivityDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} activity`;
  }
}
