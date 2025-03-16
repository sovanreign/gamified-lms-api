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
    // First, store the lesson completion record
    await this.db.studentLesson.create({
      data: body,
    });

    // Fetch the lesson details to get the `expPoints`
    const lesson = await this.db.lesson.findUnique({
      where: { id: body.lessonId },
      select: { points: true }, // Get the lesson's experience points
    });

    if (!lesson) {
      throw new Error('Lesson not found'); // Handle error if lesson doesn't exist
    }

    // Update the user's expPoints by adding the lesson's expPoints
    await this.db.user.update({
      where: { id: body.studentId },
      data: {
        expPoints: { increment: lesson.points }, // 🔥 Increase expPoints dynamically
      },
    });

    return { message: 'Lesson marked as done, expPoints updated!' };
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
      include: {
        module: true,
        StudentLesson: true,
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
