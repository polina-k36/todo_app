
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateCategoryDto {

    @Transform(({ value }): string | undefined => value === '' ? undefined : value)    
    @ApiProperty({
        description: 'Наазвание категории',
        example: 'Учеба',
        maxLength: 255
    })
    @IsOptional()
    @IsString()
    @MaxLength(255)
    name?: string;

    
    @Transform(({ value }): string | undefined => value === '' ? undefined : value)    
    @ApiProperty({
        description: 'Цвет категории',
        example: '#059669'
    })
    @IsOptional()
    @IsString()
    color?: string; 
    
    // Только для корректной обработки пустого multipart-поля Swagger.
    // Реальный файл получается через @UploadedFile().
    @IsOptional()
    @Transform(( ): undefined => undefined)
    icon?: string;

}
 