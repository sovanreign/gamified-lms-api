import { Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { DatabaseService } from 'src/database/database.service';
import { LessonCompleted } from './dto/lesson-completed.dto';

@Injectable()
export class LessonsService {
  constructor(private db: DatabaseService) {}

  async markAsDone(body: LessonCompleted) {
    await this.db.studentLesson.create({
      data: body,
    });
  }

  create(createLessonDto: CreateLessonDto) {
    return 'This action adds a new lesson';
  }

  findAll() {
    return this.db.lesson.findMany({
      include: {
        module: true,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} lesson`;
  }

  async update(id: string, updateLessonDto: UpdateLessonDto) {
    await this.db.lesson.update({
      where: { id },
      data: updateLessonDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} lesson`;
  }
}
