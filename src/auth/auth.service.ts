import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SingInDTO } from './dto/singIn.dto';
import * as bcryptjs from 'bcrypt';
import { LoginDTO } from './dto/login.dto';

@Injectable()
export class AuthService {
    constructor(private readonly usersService: UsersService,
    ) { }

    async singIn({ email, password, name, lastName }: SingInDTO) {

        const user = await this.usersService.findOneByEmail(email);

        if (user) {
            throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
        }


        return await this.usersService.create({ email, password: await bcryptjs.hash(password, 10), name, lastName, });
    }
    async login({ email, password }: LoginDTO) {
        const user = await this.usersService.findOneByEmail(email);
        if (!user) {
            throw new HttpException('UNAUTHORIZED EMAIL', HttpStatus.UNAUTHORIZED);
        }

        const isMatch = await bcryptjs.compare(password, user.password);

        if (!isMatch) {
            throw new HttpException('UNAUTHORIZED PASSWORD', HttpStatus.UNAUTHORIZED);
        }
        return user;
    }
}
