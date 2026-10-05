import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  UseGuards,
  Request,
  Query,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { GetCategoryParams } from "./dto/get-category-params.dto";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import path from "path";

/* eslint-disable @typescript-eslint/no-unsafe-member-access */
@ApiTags()
@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: "Получение списка категорий" })
  @ApiResponse({
    status: 200,
    description: "Категории найдены",
  })
  @ApiResponse({
    status: 404,
    description: "Категории не найдены",
  })
  @ApiResponse({
    status: 400,
    description: "Неверный запрос или данные",
  })
  @Get()
  @UseGuards(JwtAuthGuard)
  getCategories(@Request() req, @Query() params: GetCategoryParams) {
    const userId: number = req.user.id as number;
    return this.categoriesService.getCategories(userId, params);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Получение конкретной категории по ID" })
  @ApiResponse({
    status: 200,
    description: "Категория найдена",
  })
  @ApiResponse({
    status: 404,
    description: "Категория не найдена",
  })
  @ApiResponse({
    status: 400,
    description: "Неверный запрос или данные",
  })
  @ApiParam({
    name: "id",
    example: 2,
  })
  @Get(":id")
  @UseGuards(JwtAuthGuard)
  getCategoryById(@Param("id", ParseIntPipe) id: number, @Request() req) {
    const userId: number = req.user.id as number;
    return this.categoriesService.getCategoryById(id, userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Создание категории" })
  @ApiResponse({
    status: 201,
    description: "Категория успешно создана",
  })
  @ApiResponse({
    status: 400,
    description: "Неверный запрос или данные",
  })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          example: "Учёба",
        },
        color: {
          type: "string",
          example: "#059669",
        },
        icon: {
          type: "string",
          format: "binary",
        },
      },
      required: ["name"],
    },
  })
  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor("icon", {
      storage: diskStorage({
        destination: path.resolve(process.cwd(), "uploads", "categories"),
        filename: (_req, file, callback) => {
          const filename =
            crypto.randomUUID() + path.extname(file.originalname);
          callback(null, filename);
        },
      }),
      fileFilter: (_req, file, callback) => {
        if (
          file.mimetype === "image/png" ||
          file.mimetype === "image/jpeg" ||
          file.mimetype === "image/webp"
        )
          callback(null, true);
        else {
          callback(
            new BadRequestException(
              "Неверный тип файла. Картинка должны иметь расшширения .png, .jpeg или .webp",
            ),
            false,
          );
        }
      },
      limits: {
        fileSize: 2 * 1024 * 1024,
      },
    }),
  )
  createCategory(
    @UploadedFile() icon,
    @Body() data: CreateCategoryDto,
    @Request() req,
  ) {
    const userId: number = req.user.id as number;
    return this.categoriesService.createCategory(
      { ...data, iconKey: icon ? `categories/${icon.filename}` : undefined },
      userId,
    );
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Изменение категории" })
  @ApiResponse({
    status: 201,
    description: "Категория успешно изменена",
  })
  @ApiResponse({
    status: 404,
    description: "Категория не найдена",
  })
  @ApiResponse({
    status: 400,
    description: "Неверный запрос или данные",
  })
  @ApiParam({
    name: "id",
    example: 2,
  })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          example: "Учёба",
        },
        color: {
          type: "string",
          example: "#059669",
        },
        icon: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor("icon", {
      storage: diskStorage({
        destination: path.resolve(process.cwd(), "uploads", "categories"),
        filename: (_req, file, callback) => {
          const filename =
            crypto.randomUUID() + path.extname(file.originalname);
          callback(null, filename);
        },
      }),
      fileFilter: (_req, file, callback) => {
        if (
          file.mimetype === "image/png" ||
          file.mimetype === "image/jpeg" ||
          file.mimetype === "image/webp"
        )
          callback(null, true);
        else {
          callback(
            new BadRequestException(
              "Неверный тип файла. Картинка должны иметь расшширения .png, .jpeg или .webp",
            ),
            false,
          );
        }
      },
      limits: {
        fileSize: 2 * 1024 * 1024,
      },
    }),
  )
  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  updateCategory(
    @Param("id", ParseIntPipe) id: number,
    @Body() data: UpdateCategoryDto,
    @UploadedFile() icon,
    @Request() req,
  ) {
    const userId: number = req.user.id as number;

    return this.categoriesService.updateCategory(
      id,
      { ...data, iconKey: icon ? `categories/${icon.filename}` : undefined },
      userId,
    );
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Удаление категории" })
  @ApiResponse({
    status: 204,
    description: "Категория успешно удалена",
  })
  @ApiResponse({
    status: 404,
    description: "Категория не найдена",
  })
  @ApiResponse({
    status: 400,
    description: "Неверный запрос или данные",
  })
  @ApiParam({
    name: "id",
    example: 2,
  })
  @Delete(":id")
  @HttpCode(204)
  @UseGuards(JwtAuthGuard)
  async deleteCategory(@Param("id", ParseIntPipe) id: number, @Request() req) {
    const userId = req.user.id as number;
    await this.categoriesService.deleteCategory(id, userId);
  }
}
