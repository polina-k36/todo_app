import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, Min, Max } from "class-validator";

export class PaginationDto {   

    @ApiProperty({
        example: 1,
        default: 1,
        description: 'Номер страницы с данными'
    })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page: number = 1;

    @ApiProperty({
        example: 12,
        default: 20,
        description: 'Количество элементов на странице'
    })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(50)
    limit: number = 20;
}