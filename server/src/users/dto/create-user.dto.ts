import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsStrongPassword, MaxLength } from "class-validator";


export class CreateUserDto {

    @ApiProperty({
        description: 'Имя пользователя',
        maxLength: 255,
        example: 'User1'
    })
    @IsString()
    @MaxLength(255)
    name!: string;

    
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
        minLength: 8,
        example: 'Password_User1'
    })
    @IsString()
    @IsStrongPassword({
        minLength: 8,
        minNumbers: 1,
    })
    password!: string;

}
