import { Body, Controller, Delete, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDTO } from './dto/users.dto';

@Controller('api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }
    //Creacion de un nuevo usuario.
    @Post()
    async create(@Body(new ValidationPipe()) usersDTO: UsersDTO) {
        return await this.usersService.create(usersDTO);
    }
    //Despliegue de todos los usuarios.
    @Get()
    getAll() {
        return this.usersService.findAll();
    }
    //Despliegue segun el email del usuario *Se manda como URL*.
    @Get(':email')
    async getUser(@Param('email') email: string) {
        return await this.usersService.findOneByEmail(email);
    }
    //Eliminar segun el email del usuario
    @Delete(':email')
    async delete(@Param('email') email: string) {
        return await this.usersService.deleteByEmail(email);
    }
}
