import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class ActivityCompletedDto {
  @IsString()
  @IsNotEmpty()
  studentId: string;

  @IsString()
  @IsNotEmpty()
  activityId: string;

  @IsInt()
  @IsNotEmpty()
  score: number;

  @IsBoolean()
  @IsOptional()
  isCompleted: boolean;
}
