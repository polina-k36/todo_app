import { IsDate, IsEnum, IsInt, IsPositive, IsString, MaxLength, IsOptional } from "class-validator";
import { TaskPriorityEnum } from '../enums/task-priority.enum';
import { Type } from "class-transformer";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { TaskStatusEnum } from "../enums/task-status.enum";

export class CreateTaskDto {

    @ApiProperty({
        example: 'Изучить Prisma',
        description: 'Название задачи',
        maxLength: 255
    })
    @IsString()
    @MaxLength(255)
    title!: string; //проверить 

    @ApiPropertyOptional({
        example: 'Изучить базу и освоить на практике',
        description: 'Описание задачи'
    })
    @IsOptional()
    @IsString()
    description?: string;
    
    @ApiPropertyOptional({
        example: TaskPriorityEnum.HIGH,
        enum: TaskPriorityEnum
    })
    @IsOptional()
    @IsEnum(TaskPriorityEnum)
    priority?: TaskPriorityEnum;

    @ApiPropertyOptional({
        example: TaskStatusEnum.TODO,
        enum: TaskStatusEnum,
        description: 'Статус задачи'
    })
    @IsOptional()
    @IsEnum(TaskStatusEnum)
    status?: TaskStatusEnum;
    
    
    @ApiPropertyOptional({
        example: '2026-07-22T16:36:42',
        description: 'Срок выполнения задачи',
        format: 'date-time'
    })
    @Type(() => Date)
    @IsOptional()
    @IsDate()
    dueDate?: Date;    

    @ApiPropertyOptional({
        example: 2,
        description: 'ID категории задачи'
    })
    @IsOptional()
    @IsInt()
    @IsPositive()
    categoryId?: number;
}