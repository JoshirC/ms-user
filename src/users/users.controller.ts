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

    @Post()
    async addToken(@Param('id') id: string, @Body('token') token: string) {
        return this.usersService.addToken(token);
    }

    //Despliegue de todos los usuarios.
    @Get()
    getAll() {
        return this.usersService.findAll();
    }

    @Get('data/:email')
    async findUser(@Param('email') email: string) {
        return this.usersService.findOneUser(email);
    }

    @Get('getByMail/:email')
    findOneByEmail(@Param('email') email: string) {
        return this.usersService.findOneByEmail(email);
    }

    @Put('resetPassword/:email')
    async resetPassword(@Param('email') email:string){
        return await this.usersService.sendPasswordMail(email);
    }

    @Put('changeEmail')
    async changeEmail(@Body() emailDTO: emailDTO) {
        return this.usersService.updateEmail(emailDTO);
    }

    @Put('changeData')
    async changeData(@Body() dataDTO: dataDTO) {
        return this.usersService.updateData(dataDTO);
    }

    @Put('changePassword')
    async changePassword(@Body() passwordDTO: PasswordDTO) {
        return this.usersService.updatePassword(passwordDTO);
    }
    
    @Get('getUser/:email')
    async getUser(@Param('email') email: string) {
        return await this.usersService.findOneByEmail(email);
    }

    @Delete('deleteUser/:email')
    async deleteUser(@Param('email') email:string) {
        return await this.usersService.deleteUser(email)
    }
}
