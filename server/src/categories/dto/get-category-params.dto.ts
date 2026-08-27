import { IntersectionType } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { FilterCategoryDto } from './filter-category.dto';


export class GetCategoryParams extends IntersectionType(PaginationDto, FilterCategoryDto) {} 