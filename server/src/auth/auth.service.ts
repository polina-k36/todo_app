import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { LoginUserDto } from "../users/dto/login-user.dto";
import { UsersService } from "../users/users.service";
import bcrypt from "bcryptjs";
import { UpdateUserDto } from "../users/dto/update-user.dto";
import { UpdatePasswordDto } from "./dto/update-password.dto";

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  buildAuthResponse(
    user: { id: number; login: string; name: string },
    message: string,
  ) {
    const payload = {
      id: user.id || "no-id",
      login: user.login || "no-login",
      name: user.name || "no-name",
    };
    return {
      success: true,
      message,
      accessToken: this.jwtService.sign(payload),
      user,
    };
  }

  async login(userDto: LoginUserDto) {
    const user = await this.validateUser(userDto);
    if (user)
      return this.buildAuthResponse(
        user,
        "Успешная авторизация. Вот ваш токен",
      );
  }

  async registration(userDto: CreateUserDto) {
    const newUser = await this.userService.createUser(userDto);
    if (newUser.success) {
      return this.buildAuthResponse(
        newUser.data,
        "Создан новый пользователь и выдан токен",
      );
    }
  }

  async getProfile(userId: number) {
    return this.userService.getUserById(userId);
  }

  async updateProfile(userId: number, data: UpdateUserDto) {
    return this.userService.updateUserById(userId, data);
  }

  async updatePassword(userId: number, data: UpdatePasswordDto) {
    const { currentPassword, newPassword, confirmPassword } = data;
    if (newPassword !== confirmPassword)
      throw new BadRequestException(
        "Новый пароль должен совпадать с паролем подтверждения",
      );
    if (newPassword === currentPassword)
      throw new BadRequestException(
        "Новый пароль должен отличаться от старого",
      );

    const isValidPassword = await this.userService.checkPassword(
      userId,
      currentPassword,
    );
    if (isValidPassword) {
      return {
        success: true,
        data: this.userService.updateUserById(userId, {
          password: newPassword,
        }),
      };
    } else {
      throw new BadRequestException("Введён неверный пароль");
    }
  }

  async validateUser(userDto: LoginUserDto) {
    const user = await this.userService.getUserByLogin(userDto.login);

    if (!user.data)
      throw new UnauthorizedException({
        message: `Пользователь с логином ${userDto.login} не зарегистрирован.`,
      });

    const validPassword = bcrypt.compareSync(
      userDto.password,
      user.data.passwordHash,
    );

    if (!validPassword)
      throw new UnauthorizedException({
        message: `Неверный логин или пароль.`,
      });

    const { passwordHash, ...validatedUser } = user.data;

    return validatedUser;
  }
}
