import { Body, Controller, Delete, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDTO } from './dto/users.dto';
import { LoginDTO } from '../auth/dto/login.dto';

@Controller()
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
    @Get()
    findOneByEmail(@Param('email') email: string) {
        return this.usersService.findOneByEmail(email);
    }
    @Post()
    async addToken(@Param('id') id: string, @Body('token') token: string) {
        return this.usersService.addToken(token);
    }

}
