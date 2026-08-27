import { IntersectionType } from "@nestjs/swagger";
import { FilterTaskDto } from "./filter-task.dto";
import { PaginationDto } from "src/common/dto/pagination.dto";


export class GetTaskParamsDto extends IntersectionType(PaginationDto, FilterTaskDto) {}