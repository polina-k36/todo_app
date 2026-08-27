import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import {IUser, IUserUpdate} from "./interfaces/user.interface";
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class UsersService {
    
    constructor(private prisma: PrismaService) {}

  
  private users: IUser[] = [
      {
          id: 1,
          name: 'Pol 1',
          login: 'user1',
          password_hash: '$2b$04$p3waCY4Urb7bydIjuO0oSOcPa8jcL34WbJrQvTjkQLk.YdWdg5okq',
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: 2,
          name: 'Olay 2',
          login: 'user2',
          password_hash: '$2b$04$nUKevN5jqZLrHDje1qnEH.FXWRxZhDFA5g/.UKxvuE0Uk1lqeH/oO',
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: 3,
          name: 'User 3',
          login: 'user3',
          password_hash: 'hash3',
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: 4,
          name: 'User 4',
          login: 'user4',
          password_hash: 'hash4',
          created_at: new Date(),
          updated_at: new Date()
      }
  ];

    async getUsers() {
        return {
            success: true,
            data: await this.prisma.user.findMany()
        }
    }

    async getUserById(id: number) {
        const user = await this.prisma.user.findUnique({
            where: {id},
            select: {
                id: true, name: true, login: true, createdAt: true
            }
        });
        if (!user) throw new NotFoundException('Пользователь не найден'); 

        return {
            success: true,
            data: user
        };
    }

    async checkPassword(id: number, password: string) {
        const user = await this.prisma.user.findUnique({
            where: {id}
        });
        if (!user) throw new NotFoundException('Пользователь не найден');
        if (bcrypt.compareSync(password, user.passwordHash)) return true;
        else return false; 
    }

    async getUserByLogin(login: string) {
        const user = await this.prisma.user.findUnique({
            where: {login},
            select: {
                id: true, name: true, login: true, passwordHash: true
            }
        });
        
        return {
            success: true,
            data: user
        };
    }

    async createUser(userDto: CreateUserDto) {
        const user = await this.prisma.user.findUnique({
            where: {login: userDto.login}
        });
        if (user) throw new ConflictException({
            message: `Пользователь с логином ${userDto.login} уже существует.`
        });
        
        const {password, ...newDataWithoutPass} = userDto;
        const passwordHash = bcrypt.hashSync(password, 4);
        
        const createdUser = await this.prisma.user.create({
            data: {
                ...newDataWithoutPass,
                passwordHash,
            },
            select: {
                id: true, name: true, login: true
            }
        });
        
        return {
            success: true,
            data: createdUser
        };
    }

    async updateUserById(id: number, newData: UpdateUserDto) {
        const user = await this.prisma.user.findUnique({
            where: {id},
        });
        if (!user) throw new NotFoundException('Пользователь не найден'); 

        const updatedUserData: IUserUpdate = {};
        (Object.keys(newData) as Array<keyof typeof newData>).forEach((key) => {
            const value = newData[key];

            if (value === undefined) return;

            if (key === 'login') {
                const isLoginTaken = this.users
                    .filter((user) => user.id !== id)
                    .some((user) => user.login === value);

                if (isLoginTaken) {
                    throw new ConflictException(
                        'Пользователь с таким логином уже есть',
                    );
                }

                updatedUserData.login = value;
                return;
            }

            if (key === 'password') {
                updatedUserData.passwordHash = bcrypt.hashSync(value, 4);
                return;
            }

            Object.assign(updatedUserData, {
                [key]: value,
            });
        });
        
        
        const updatedUser = await this.prisma.user.update({
            where: {id},
            data: updatedUserData,
            select: {
                id: true, name: true, login: true, createdAt: true
            }
        });
        
        return {
            success: true,
            data: updatedUser
        };
    }
    
    async deleteUser(id: number) {
        const user = await this.prisma.user.findUnique({
            where: {id}
        });
        if (!user) throw new NotFoundException('Пользователь не найден');

        await this.prisma.user.delete({
            where: {id}
        })
    }
}
