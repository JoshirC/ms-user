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
    /*
    @Post('singIn')
    async create(@Body() signInDto: SignInDto){
        const {email, password} = signInDto;
        return await this.usersService.signIn(email, password);
    }
    */
}
