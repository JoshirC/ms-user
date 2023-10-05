import { Body, Controller, Delete, Get, Param, Post, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersDTO } from './dto/users.dto';
import { SignInDto } from './dto/sign-in.dto';

@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) {
    }

    //Creacion de un nuevo usuario.
    @Post('singIn')
    async create(@Body() usersDTO: UsersDTO) {
        const { email, password, name, lastName } = usersDTO;
        return await this.usersService.create(email, password, name, lastName);
    }

    //Despliegue de todos los usuarios.
    @Get()
    getAll() {
        return this.usersService.findAll();
    }
    //Despliegue segun el email del usuario *Se manda como URL*.
    @Get('Login')
    async getUser(@Param('email, password') email: string, password: string) {
        return await this.usersService.login(email, password);
    }
    //Eliminar segun el email del usuario
    @Delete(':email')
    async delete(@Param('email') email: string) {
        return await this.usersService.deleteByEmail(email);
    }
    /*
    @Post('singIn')
    async create(@Body() signInDto: SignInDto){
        const {email, password} = signInDto;
        return await this.usersService.signIn(email, password);
    }
    */
}
