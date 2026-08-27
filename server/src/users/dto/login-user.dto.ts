import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength } from "class-validator";


export class LoginUserDto {
    
    @ApiProperty({
        description: 'Логин пользователя',
        maxLength: 255,
        example: 'LoginUser1'
    })
    @IsString()
    @MaxLength(255)
    login!: string;

    @ApiProperty({
        description: 'Пароль пользователя',
        format: 'password',
        example: 'Password_User1'
    })
    @IsString()
    password!: string;
}