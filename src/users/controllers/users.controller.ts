import { Body, Controller, Delete, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UsersDTO } from '../dto/users.dto';

@Controller('api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }
    //Creacion de un nuevo usuario.
    @Post()
    create(@Body(new ValidationPipe()) usersDTO: UsersDTO) {
        return this.usersService.create(usersDTO);
    }
    //Despliegue de todos los usuarios.
    @Get()
    getAll() {
        return this.usersService.findAll();
    }
    //Despliegue segun el email del usuario *Se manda como URL*.
    @Get(':email')
    getUser(@Param('email') email: string) {
        return this.usersService.findOneByEmail(email);
    }
    //Eliminar segun el email del usuario
    @Delete(':email')
    delete(@Param('email') email: string) {
        return this.usersService.deleteByEmail(email);
    }
}
