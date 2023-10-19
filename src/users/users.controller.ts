import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDTO } from './dto/users.dto';
import { LoginDTO } from '../auth/dto/login.dto';
import { emailDTO } from './dto/email.dto';
import { dataDTO } from './dto/data.dto';
import { PasswordDTO } from './dto/password.dto';

@Controller('user')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    //Creacion de un nuevo usuario.
    @Post()
    async create(@Body() usersDTO: UsersDTO) {
        return await this.usersService.create(usersDTO);
    }

    //Despliegue de todos los usuarios.
    @Get()
    getAll() {
        return this.usersService.findAll();
    }
    @Post('data')
    async findUser(@Body('email') email: string) {
        return this.usersService.findOneUser(email);

    }
    @Post('changeEmail')
    async changeEmail(@Body() emailDTO: emailDTO) {
        return this.usersService.updateEmail(emailDTO);
    }
    @Post('changeData')
    async changeData(@Body() dataDTO: dataDTO) {
        return this.usersService.updateData(dataDTO);
    }
    @Post('changePassword')
    async changePassword(@Body() passwordDTO: PasswordDTO) {
        return this.usersService.updatePassword(passwordDTO);
    }
    @Get()
    findOneByEmail(@Param('email') email: string) {
        return this.usersService.findOneByEmail(email);
    }
    @Post()
    async addToken(@Param('id') id: string, @Body('token') token: string) {
        return this.usersService.addToken(token);
    }

}
