import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ICategory } from "./interfaces/category.interface";
import { PrismaService } from "../prisma/prisma.service";
import { GetCategoryParams } from "./dto/get-category-params.dto";
import { env } from "process";
//просмотреть пвоторы и может заменить их как то
/* const category = ...
if (!category) ...

const task = ...
if (!task) ...

const user = ...
if (!user) ...
можно будет вынести подобные проверки в небольшие приватные методы или отдельные сервисы. Это уменьшит дублирование и сделает код компактнее. */

interface CreateCategoryData {
  name: string;
  color?: string;
  iconKey?: string | null;
  icon?: string;
}

interface UpdateCategoryData {
  name?: string;
  color?: string;
  iconKey?: string;
  icon?: string;
}

@Injectable()
export class CategoriesService {
  categories: ICategory[] = [
    {
      id: 2,
      name: "ДЛя работы",
      icon: null,
      user_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 3,
      name: "Для дома",
      icon: null,
      user_id: 2,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 4,
      name: "Для учебы",
      icon: null,
      user_id: null,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 5,
      name: "Для здоровья",
      icon: null,
      user_id: 1,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 6,
      name: "Для спорта",
      icon: null,
      user_id: 2,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 7,
      name: "Для развлечений",
      icon: null,
      user_id: null,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: 8,
      name: "Для путешествий",
      icon: null,
      user_id: null,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];

  constructor(private readonly prisma: PrismaService) {}

  async getCategories(userId: number, params: GetCategoryParams) {
    const { sort, order, page, limit } = params;

    const [categories, total] = await Promise.all([
      this.prisma.category.findMany({
        include: {
          _count: {
            select: {
              tasks: true,
            },
          },
        },
        where: {
          userId: userId || null,
        },
        orderBy: sort ? { [sort]: order || "asc" } : { id: "asc" },
        take: limit,
        skip: (page - 1) * limit,
      }),
      this.prisma.category.count({
        where: {
          userId: userId || null,
        },
      }),
    ]);

    const totalPage = Math.ceil(total / limit);

    return {
      success: true,
      page,
      limit,
      total,
      totalPage,
      data: categories.map(({ _count, ...category }) => ({
        ...category,
        iconKey: category.iconKey
          ? `${env.BASE_URL}/uploads/${category.iconKey}`
          : null,
        tasksCount: _count.tasks,
      })),
    };
  }

  async getCategoryById(id: number, userId: number) {
    const category = await this.prisma.category.findUnique({
      where: {
        id,
        userId: userId || null,
      },
    });
    if (!category)
      throw new NotFoundException(`Категория с ID ${id} не найдена`);
    return {
      success: true,
      data: {
        ...category,
        iconKey: category.iconKey
          ? `${env.BASE_URL}/uploads/${category.iconKey}`
          : null,
      },
    };
  }

  async createCategory(categoryData: CreateCategoryData, userId: number) {
    const createdCategory = await this.prisma.category.create({
      data: {
        ...categoryData,
        userId,
      },
    });
    return {
      success: true,
      data: createdCategory,
    };
  }

  async updateCategory(
    id: number,
    categoryDto: UpdateCategoryData,
    userId: number,
  ) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });
    if (!category)
      throw new NotFoundException(`Категория с ID ${id} не найдена`);

    if (category.userId !== userId)
      throw new ForbiddenException("Нельзя изменять общие и чужие категории");

    const updatedCategory = await this.prisma.category.update({
      where: { id },
      data: {
        name: categoryDto.name,
        iconKey: categoryDto.iconKey,
        color: categoryDto.color,
      },
    });

    return {
      success: true,
      data: updatedCategory,
    };
  }

  async deleteCategory(id: number, userId: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });
    if (!category)
      throw new NotFoundException(`Категория с ID ${id} не найдена`);

    if (category.userId !== userId)
      throw new ForbiddenException(
        "Нельзя удалять системные или чужие категории",
      );
    await this.prisma.category.delete({
      where: { id },
    });
  }
}
