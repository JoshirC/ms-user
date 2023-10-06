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
    /*
    async createas(email: string, password: string, name: string, lastName: string) {
        const user = new this.usersModel({
            email,
            password,
            name,
            lastName
        });

        if (!user) {
            throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);
        }

        const userCreated = await user.save();
        return userCreated;
    }
    */
    async findAll(): Promise<Users[]> {
        return this.usersModel.find().exec();
    }
    /*
    async login(email: string, password: string) {
        return this.usersModel.findOne({ email: email, password: password }).exec();
    }
    */
    async findOneByEmail(email: string) {
        return this.usersModel.findOne({ email: email });
    }
}
