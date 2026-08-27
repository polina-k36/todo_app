import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsStrongPassword, MaxLength } from "class-validator";

export class UpdatePasswordDto {
    
    @ApiProperty({
        description: 'Старый пароль',
        example: 'Password_User1',
        maxLength: 255
    })
    @IsString()
    @MaxLength(255)
    currentPassword!: string;
    
    @ApiProperty({
        description: 'Новый пароль',
        format: 'password',
        minLength: 8,
        example: 'Password_User1432'
    })
    @IsString()
    @IsStrongPassword({
        minLength: 8,
        minNumbers: 1,
    })
    newPassword!: string;
    
    @ApiProperty({
        description: 'Подтверждение нового пароля',
        format: 'password',
        minLength: 8,
        example: 'Password_User1432'
    })
    @IsString()
    confirmPassword!: string;
} 

