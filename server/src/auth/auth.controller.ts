import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Request,
  Patch,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "../users/dto/login-user.dto";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import { UpdatePasswordDto } from "./dto/update-password.dto";
import { UpdateUserDto } from "../users/dto/update-user.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Авторизация пользователя" })
  @ApiResponse({
    status: 201,
    description: "Успешная авторизация. Создание токена.",
  })
  @ApiResponse({
    status: 401,
    description: "Неверный логин или пароль",
  })
  @ApiResponse({
    status: 400,
    description: "Неверный запрос или данные",
  })
  @Post("login")
  login(@Body() userDto: LoginUserDto) {
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: "Регистрация пользователя" })
  @ApiResponse({
    status: 201,
    description:
      "Успешная регистрация. Создание аккаунта в базе данных и токена",
  })
  @ApiResponse({
    status: 409,
    description: "Пользователь с такими логином уже существует",
  })
  @ApiResponse({
    status: 400,
    description: "Неверный запрос или данные",
  })
  @Post("registration")
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Получение профиля" })
  @ApiResponse({
    status: 201,
    description: "Профиль получен",
  })
  @ApiResponse({
    status: 401,
    description: "Пользователь не авторизован",
  })
  @ApiResponse({
    status: 400,
    description: "Неверный запрос или данные",
  })
  @UseGuards(JwtAuthGuard)
  @Get("profile")
  getProfile(@Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userId: number = req.user.id as number;
    return this.authService.getProfile(userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Обновление порфиля пользователя" })
  @ApiResponse({
    status: 201,
    description: "Пользователь успешно обновлен",
  })
  @ApiResponse({
    status: 400,
    description: "Неверный запрос или данные",
  })
  @UseGuards(JwtAuthGuard)
  @Patch("profile")
  updateProfile(@Body() data: UpdateUserDto, @Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userId: number = req.user.id as number;
    return this.authService.updateProfile(userId, data);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: "Обновление пароля" })
  @ApiResponse({
    status: 201,
    description: "Пароль успешно обновлен",
  })
  @ApiResponse({
    status: 400,
    description: "Неверный запрос или данные",
  })
  @UseGuards(JwtAuthGuard)
  @Patch("password")
  updatePassword(@Body() data: UpdatePasswordDto, @Request() req) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const userId: number = req.user.id as number;
    return this.authService.updatePassword(userId, data);
  }
}
