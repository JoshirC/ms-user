import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Users } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersDTO } from './dto/users.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
    [x: string]: any;
    constructor(@InjectModel(Users.name)
    private usersModel: Model<Users>,
    ) {
    }
    async create(Users: UsersDTO): Promise<Users> {
        const userCreated = new this.usersModel(Users);
        return userCreated.save();
    }

    async findAll(): Promise<Users[]> {
        return this.usersModel.find().exec();
    }

    async findOneByEmail(email: string) {
        return this.usersModel.findOne({ email: email });
    }
    async updateToken(id: string, token: string): Promise<void> {
        const user = await this.usersModel.findById(id);

        if (!user) {
            throw new HttpException('UNAUTHORIZED USER', HttpStatus.UNAUTHORIZED);
        }

        user.token = token;
        user.save();

    }
}
