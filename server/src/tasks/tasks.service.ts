import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { TaskPriorityEnum } from './enums/task-priority.enum';
import { TaskStatusEnum } from './enums/task-status.enum';
import { ITask } from './interfaces/task.interface';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { SortValuesEnum } from './enums/sort-values.enum';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { GetTaskParamsDto } from './dto/get-task-params.dto';
import { env } from 'process';
//подумать над датой выполнения когда задачи переходят в режим выполнения или из него
//ограничить изменение задачи на дан в патче
//фильтр даты
//сортировка
//пагинация - разделение большого объема информация на страницы + лимиты
//круд для остальных
//авторизация


@Injectable()
export class TasksService {    
    private tasks: ITask[] = [
        {
            id: 1,
            title: 'Task 1',
            description: 'Description for ITask 1',
            status: TaskStatusEnum.TODO,
            priority: TaskPriorityEnum.HIGH,
            created_at: new Date(),
            due_date: new Date(),
            updated_at: new Date(),
            completed_at: undefined,
            user_id: 2,
            category_id: 1,
        },
        {
            id: 2,
            title: 'Task 2',
            description: 'Description for ITask 2',
            status: TaskStatusEnum.IN_PROGRESS,
            priority: TaskPriorityEnum.MEDIUM,
            created_at: new Date(),
            due_date: new Date(),
            updated_at: new Date(),
            completed_at: undefined,
            user_id: 1,
            category_id: 1,
        },
        {
            id: 3,
            title: 'Task 3',
            description: 'Description for ITask 3',
            status: TaskStatusEnum.DONE,
            priority: TaskPriorityEnum.LOW,
            created_at: new Date(),
            due_date: new Date(),
            updated_at: new Date(),
            completed_at: new Date(),
            user_id: 1,
            category_id: 1,
        },
        {
            id: 4,
            title: 'Task 4',
            description: 'Description for ITask 4',
            status: TaskStatusEnum.TODO,
            priority: TaskPriorityEnum.MEDIUM,
            created_at: new Date(),
            due_date: new Date(),
            updated_at: new Date(),
            completed_at: undefined,
            user_id: 1,
            category_id: 1,
        },
        {
            id: 5,
            title: 'Task 5',
            description: 'Description for ITask 5',
            status: TaskStatusEnum.TODO,
            priority: TaskPriorityEnum.LOW,
            created_at: new Date(),
            due_date: new Date(),
            updated_at: new Date(),
            completed_at: undefined,
            user_id: 1,
            category_id: 1,
        }
    ];

    private taskField = {
        id: true, title: true, description: true, status: true, priority: true, dueDate: true, createdAt: true,
        category: {
            select: { id: true, name: true, color: true, iconKey: true }
        }
    }

    constructor(private prisma: PrismaService) {}

    //Promise<IPaginatedResponse<Task>> -- из за селекта ломается data
    async getTasks(userId: number, params: GetTaskParamsDto) {
        const {categoryId, status, priority, search, expired, sort, order, page, limit, ...filterDate} = params;     
        
        const where: Prisma.TaskWhereInput = {
            userId, categoryId, status, priority
        };

        //иправить и сократить код  чтобы устранить повторы
        if (filterDate.completedAtFrom || filterDate.completedAtTo) {
            where.completedAt = {
                lte: filterDate.completedAtTo,
                gte: filterDate.completedAtFrom
            }
        }
        if (filterDate.dueDateTo || filterDate.dueDateFrom) {
            where.dueDate = {
                lte: filterDate.dueDateTo,
                gte: filterDate.dueDateFrom
            }
        }
        if (filterDate.createdAtTo || filterDate.createdAtFrom) {
            where.createdAt = {
                lte: filterDate.createdAtTo,
                gte: filterDate.createdAtFrom
            }
        }
        if (expired) {
            where.AND = [
                {
                    dueDate: { lte: new Date(), not: null}
                },
                {
                    status: TaskStatusEnum.TODO
                },
                {
                    completedAt: null
                }
            ]
        }   
        else if (expired == false) {
            where.OR = [
                {
                    dueDate: {gte: new Date()}
                },
                {
                    dueDate: null
                }
            ]
        }
        if (search) {
            where.OR = [
                {
                    title: {
                        contains: search,
                        mode: 'insensitive',
                    }
                },
                {
                    description: {
                        contains: search,
                        mode: 'insensitive',
                    }
                }
            ]
        }

        const [total, tasks] = await Promise.all([
            this.prisma.task.count({ where }),
            this.prisma.task.findMany({
                where,
                orderBy: sort ? { [sort]: order ?? 'asc' } : { createdAt: 'desc' },
                skip: (page - 1) * limit,
                take: limit,
                select: this.taskField,
            }),
        ]);       

        const totalPages = Math.ceil(total / limit);

        return {
            success: true,
            page,
            limit,
            total,
            totalPages,
            data: tasks.map(task => ({
                ...task,
                category: task.category
                    ? {
                        ...task.category,
                        iconKey: task.category.iconKey
                            ? `${env.BASE_URL}/uploads/${task.category.iconKey}`
                            : null,
                    }
                    : null,
            }))
        }
    }

    sortByKey(key: SortValuesEnum, array: ITask[], desc: boolean): ITask[]{
        
        if (array.length === 0) {
            return array;
        }

        const priorityOrder = {
            NONE: 1,
            LOW: 2,
            MEDIUM: 3,
            HIGH: 4
        }

        if (key === SortValuesEnum.PRIORITY) {
            return desc 
            ? array.toSorted((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])
            : array.toSorted((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
        }

        const type = typeof array[0][key];

        switch (type) {
            case 'string':
                return array.toSorted((a, b) => {
                    const va = a[key] as string | undefined;
                    const vb = b[key] as string | undefined;

                    if (va === undefined && vb === undefined) return 0;
                    if (va === undefined) return desc ? 1 : -1;
                    if (vb === undefined) return desc ? -1 : 1;

                    return desc ? vb.localeCompare(va) : va.localeCompare(vb);
                });

            case 'number':
                return array.toSorted((a, b) => {
                    const va = a[key] as number | undefined;
                    const vb = b[key] as number | undefined;

                    if (va === undefined && vb === undefined) return 0;
                    if (va === undefined) return desc ? 1 : -1;
                    if (vb === undefined) return desc ? -1 : 1;

                    return desc ? (vb ?? -Infinity) - (va ?? -Infinity) : (va ?? -Infinity) - (vb ?? -Infinity); // для Null
                });

            default:
                return array.toSorted((a, b) => {
                    // Если оба — даты
                    if (a[key] instanceof Date && b[key] instanceof Date) {
                        const diff = a[key].getTime() - b[key].getTime();
                        return desc ? -diff : diff;
                    }

                    // Если только одна дата — можно решить, куда её ставить
                    if (a[key] instanceof Date) return desc ? -1 : 1;
                    if (b[key] instanceof Date) return desc ? 1 : -1;

                    // Для остальных случаев — можно либо не менять порядок, либо сортировать по строке
                    return 0;
                });
        }
    }

    async getStatsTasks(userId: number) {

        const [total, completed, overdue, inProgress] = await Promise.all([
            this.prisma.task.count({ where: { userId } }),
            this.prisma.task.count({ where: { userId, status: "DONE" } }),
            this.prisma.task.count({where:  { userId,
                dueDate: {                    
                    lte: new Date(),
                    not: null,                   
                },
                status: {
                    in: [TaskStatusEnum.TODO, TaskStatusEnum.IN_PROGRESS]
                },
                completedAt: null,
            }}),
            this.prisma.task.count({ where: { userId, 
                status: {
                    equals: TaskStatusEnum.IN_PROGRESS
                }, 
            }})
        ])

        return {
            success: true,
            data: {
                total,
                completed,
                overdue,
                inProgress
            }
        }
    }

    
    async getTaskById(id: number, userId: number) {
        const task = await this.prisma.task.findUnique({
            where: {
                id,
                userId
            },
            select: this.taskField,
        })
        if (!task) throw new NotFoundException(`Задача с ID ${id} не найдена`);
        return {
            success: true,
            data: {
                ...task,
                category: task.category
                    ? {
                        ...task.category,
                        iconKey: task.category.iconKey
                            ? `${env.BASE_URL}/uploads/${task.category.iconKey}`
                            : null,
                    }
                    : null
            }
        };
        
    }

    
    async createTask(dtoTask: CreateTaskDto, userId: number) {
        const newTask = await this.prisma.task.create({
            data: {
                ...dtoTask, 
                userId: userId
            },
            select: this.taskField
        })
        
        return {
            success: true,
            data: {
                ...newTask,
                category: newTask.category
                    ? {
                        ...newTask.category,
                        iconKey: newTask.category.iconKey
                            ? `${env.BASE_URL}/uploads/${newTask.category.iconKey}`
                            : null,
                    }
                    : null
            }
        }
    }

    async completeTask(id: number, userId: number) {

        const task = await this.prisma.task.findUnique({
            where: {
                id, userId
            },
        });

        if (!task) throw new NotFoundException(`Задача с ID ${id} не найдена`);

        if (task.status === "DONE") return {message: "Эта задача уже была завершена", task}

        const completedTask = await this.prisma.task.update({
            where: {id},
            data: {
                completedAt: new Date(),
                status: "DONE"
            },
            select: this.taskField,
        });
        return {
            success: true,
            data: {
                ...completedTask,
                category: completedTask.category
                    ? {
                        ...completedTask.category,
                        iconKey: completedTask.category.iconKey
                            ? `${env.BASE_URL}/uploads/${completedTask.category.iconKey}`
                            : null,
                    }
                    : null
            }
        };
    }

    async incompleteTask(id: number, userId: number) {

        const task = await this.prisma.task.findUnique({
            where: {
                id, userId
            },
        });

        if (!task) throw new NotFoundException(`Задача с ID ${id} не найдена`);

        if (task.status !== "DONE") return {message: "Эта задача еще не была закончена", task}

        const uncompletedTask = await this.prisma.task.update({
            where: {id},
            data: {
                completedAt: null,
                status: "TODO"
            },
            select: this.taskField,
        });
        return {
            success: true,
            data:  {
                ...uncompletedTask,
                category: uncompletedTask.category
                    ? {
                        ...uncompletedTask.category,
                        iconKey: uncompletedTask.category.iconKey
                            ? `${env.BASE_URL}/uploads/${uncompletedTask.category.iconKey}`
                            : null,
                    }
                    : null
            }
        };
    }

    async updateTask(id: number, dtoTask: UpdateTaskDto, userId: number) {
        //обновление статуса из дона в какой то 
        //продумать сообщение пользователю

        let updatedTask: unknown;
        const task = await this.prisma.task.findUnique({
            where: {
                id,
                userId
            },
        });

        if (!task) {
            throw new NotFoundException(`Задача с ID ${id} не найдена`);
        }
        if (dtoTask.status === TaskStatusEnum.DONE) {
            throw new BadRequestException("Обратитесь к endpoint /complete для назначения статуса DONE у задач")
        }
        if (task.status === "DONE" && dtoTask.status) {
            updatedTask = await this.prisma.task.update({
                where: { id },
                data: {...dtoTask, completedAt: null}, 
                select: this.taskField
            })
        } else {
            updatedTask = await this.prisma.task.update({
                where: { id },
                data: dtoTask, 
                select: this.taskField
            });
        }

        return {
            success: true,
            data: updatedTask
        }

        
    }

    async deleteTask(id: number, userId: number) {
        const task = await this.prisma.task.findUnique({
            where: {
                id,
                userId
            },
        });

        if (!task) {
            throw new NotFoundException(`Задача с ID ${id} не найдена`);
        }

        await this.prisma.task.delete({
            where: {id}
        })
    }   
}
