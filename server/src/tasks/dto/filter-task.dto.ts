import { IsBoolean, IsDate, IsEnum, IsInt, IsOptional, IsString, Min } from "class-validator";
import { TaskStatusEnum } from "../enums/task-status.enum";
import { TaskPriorityEnum } from "../enums/task-priority.enum";
import { Type, Transform } from "class-transformer";
import { SortValuesEnum } from "../enums/sort-values.enum";
import { SortOrderEnum } from "src/common/enums/sort-order.enum";
import { ApiPropertyOptional } from "@nestjs/swagger";


//подумать над датами 
export class FilterTaskDto {
    
    @ApiPropertyOptional({
        description: 'ID категории задачи'
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    categoryId?: number;

    @ApiPropertyOptional({
        description: 'Описание или название задачи'
    })
    @IsOptional()
    @IsString()
    search?: string;

    @ApiPropertyOptional({
        enum: TaskStatusEnum,
        description: 'Статус задачи',

    })
    @IsOptional()
    @IsEnum(TaskStatusEnum)
    status?: TaskStatusEnum;

    @ApiPropertyOptional({
        enum: TaskPriorityEnum,
        description: 'Приоритетность задачи'
    })
    @IsOptional()
    @IsEnum(TaskPriorityEnum)
    priority?: TaskPriorityEnum;
    
    @ApiPropertyOptional({
        description: 'Минимальная дата создания задачи',
        format: 'date-time'
    })
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    createdAtFrom?: Date;
    
    @ApiPropertyOptional({
        description: 'Максимальная дата создания задачи',
        format: 'date-time'
    })
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    createdAtTo?: Date;

    @ApiPropertyOptional({
        description: 'Минимальная дата сдачи задачи',
        format: 'date-time'
    })
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    dueDateFrom?: Date;
        
    @ApiPropertyOptional({
        description: 'Максимальная дата сдачи задачи',
        format: 'date-time'
    })
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    dueDateTo?: Date;    

    @ApiPropertyOptional({
        description: 'Минимальная дата выполнения задачи',
        format: 'date-time'
    })
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    completedAtFrom?: Date;
       
    @ApiPropertyOptional({
        description: 'Максимальная дата выполнения задачи',
        format: 'date-time'
    })
    @IsOptional()
    @Type(() => Date)
    @IsDate()
    completedAtTo?: Date;
    

    @ApiPropertyOptional({
        description: 'Задачи с истекшим сроком выполнения',
    })
    @IsOptional()
    @Transform(({ value }) => value === 'true')
    @IsBoolean()
    expired?: boolean;

    @ApiPropertyOptional({
        description: 'Сортировка по полям',
        enum: SortValuesEnum
    })
    @IsOptional()
    @IsEnum(SortValuesEnum)
    sort?: SortValuesEnum;

    @ApiPropertyOptional({
        description: 'Порядок сортировки',
        enum: SortOrderEnum
    })    
    @IsOptional()
    @IsEnum(SortOrderEnum)
    order?: SortOrderEnum;
}