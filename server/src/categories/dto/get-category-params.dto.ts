import { IntersectionType } from "@nestjs/swagger";
import { FilterCategoryDto } from "./filter-category.dto";
import { PaginationDto } from "../../common/dto/pagination.dto";

export class GetCategoryParams extends IntersectionType(
  PaginationDto,
  FilterCategoryDto,
) {}
