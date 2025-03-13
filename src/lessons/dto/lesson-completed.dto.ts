import { IsNotEmpty, IsString } from 'class-validator';

export class LessonCompleted {
  @IsString()
  @IsNotEmpty()
  studentId: string;

  @IsString()
  @IsNotEmpty()
  lessonId: string;
}
