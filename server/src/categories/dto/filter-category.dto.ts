import { IsEnum, IsOptional } from "class-validator";
import { SortValuesEnum } from "../enums/sort-values.dto";
import { SortOrderEnum } from "src/common/enums/sort-order.enum";
import { ApiPropertyOptional } from "@nestjs/swagger";

//вынести в класс вид сортировку
export class FilterCategoryDto {
    
    @ApiPropertyOptional({
        description: 'Поле для сортировки',
        enum: SortValuesEnum
    })
    @IsOptional()
    @IsEnum(SortValuesEnum)
    sort?: SortValuesEnum 
     
    @ApiPropertyOptional({
        description: 'Порядок сортировки',
        enum: SortOrderEnum
    })
    @IsOptional()
    @IsEnum(SortOrderEnum)
    order?: SortOrderEnum
}