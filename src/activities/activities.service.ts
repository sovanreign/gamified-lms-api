import { Injectable } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { DatabaseService } from 'src/database/database.service';
import { ActivityCompletedDto } from './dto/activity-completed.dto';

@Injectable()
export class ActivitiesService {
  constructor(private db: DatabaseService) {}

  async markAsDone(body: ActivityCompletedDto) {
    // First, store the activity completion record
    await this.db.studentActivity.create({
      data: body,
    });

    // Ensure the score exists in the request
    if (!body.score) {
      throw new Error('Score is required to update expPoints');
    }

    // Update the user's expPoints by adding the score from the activity
    await this.db.user.update({
      where: { id: body.studentId },
      data: {
        expPoints: { increment: body.score }, // 🔥 Add the score dynamically
      },
    });

    return { message: 'Activity marked as done, expPoints updated!' };
  }

  create(createActivityDto: CreateActivityDto) {
    return 'This action adds a new activity';
  }

  findAll() {
    return this.db.activity.findMany({
      include: {
        StudentActivity: {
          include: {
            student: true,
          },
        },
      },
      orderBy: [{ isOpen: 'desc' }, { createdAt: 'asc' }],
    });
  }

  findOne(id: string) {
    return this.db.activity.findUniqueOrThrow({
      where: { id },
      include: {
        StudentActivity: {
          include: {
            student: true,
          },
        },
      },
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
