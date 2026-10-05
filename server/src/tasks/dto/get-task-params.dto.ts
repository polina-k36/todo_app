import { IntersectionType } from "@nestjs/swagger";
import { FilterTaskDto } from "./filter-task.dto";
import { PaginationDto } from "../../common/dto/pagination.dto";

export class GetTaskParamsDto extends IntersectionType(
  PaginationDto,
  FilterTaskDto,
) {}
