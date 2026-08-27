import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";


@Injectable()
export class TrimPipe implements PipeTransform {
    transform(value: string) {
        if (typeof value !== 'string') throw new BadRequestException('В запросе пришла не строка')
        return value.trim();
    }
}