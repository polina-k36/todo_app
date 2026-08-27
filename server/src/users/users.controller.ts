import { Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @ApiOperation({ summary: 'Получение списка пользователей'})
    @ApiResponse({
        status: 200,
        description: 'Пользователи найдены'
    })
    @ApiResponse({
        status: 404,
        description: 'Пользователи не найдены'
    })
    @Get()
    getUsers() {
        return this.usersService.getUsers();
    }

    @ApiOperation({ summary: 'Получение пользователя по ID'})
    @ApiResponse({
        status: 200,
        description: 'Пользователь найдены'
    })
    @ApiResponse({
        status: 404,
        description: 'Пользователь не найдены'
    })
    @ApiResponse({
        status: 400,
        description: 'Неверный запрос или данные'
    })
    @ApiParam({name: 'id', example: 2})
    @Get(':id')
    getUserById(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.getUserById(id);
    }

    @ApiOperation({ summary: 'Обновление пользователя по ID'})
    @ApiResponse({
        status: 201,
        description: 'Пользователь усппшно обновлен'
    })
    @ApiResponse({
        status: 400,
        description: 'Неверный запрос или данные'
    })
    @ApiParam({name: 'id', example: 2})
    @Patch(':id') 
    updateUserById(@Param('id', ParseIntPipe) id: number, @Body() data: UpdateUserDto) {
        return this.usersService.updateUserById(id, data);

    }

    @ApiOperation({ summary: 'Удаление пользователя по ID'})
    @ApiResponse({
        status: 204,
        description: 'Пользователь успешно удален'
    })
    @ApiResponse({
        status: 400,
        description: 'Неверный запрос или данные'
    })
    @ApiParam({name: 'id', example: 2})
    @Delete(':id')
    @HttpCode(204)
    deleteUser(@Param('id', ParseIntPipe) id: number) {
        this.usersService.deleteUser(id);
    }
    
}
