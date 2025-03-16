import { Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { DatabaseService } from 'src/database/database.service';
import { LessonCompleted } from './dto/lesson-completed.dto';
import { Prisma } from '@prisma/client';

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

  findAll(moduleId?: string) {
    const where: Prisma.LessonWhereInput = {};

    if (moduleId) {
      where.moduleId = moduleId;
    }

    return this.db.lesson.findMany({
      where,
      include: {
        module: true,
        StudentLesson: true,
      },
      orderBy: [{ isOpen: 'desc' }, { createdAt: 'asc' }],
    });
  }

  findOne(id: string) {
    return this.db.lesson.findUniqueOrThrow({
      where: {
        id,
      },
    });
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
