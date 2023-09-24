import { Get, Injectable, Param, Post } from '@nestjs/common';
import { Users } from '../schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersDTO } from '../dto/users.dto';

@Injectable()
export class UsersService {
    [x: string]: any;
    constructor(@InjectModel(Users.name) private usersModel: Model<Users>) {
    }
    async create(Users: UsersDTO): Promise<Users> {
        const userCreated = new this.usersModel(Users);
        return userCreated.save();
    }

    findAll(): Promise<Users[]> {
        return this.usersModel.find().exec();
    }

    findOneByEmail(email: string) {
        return this.usersModel.findOne({ email: email }).exec();
    }
    deleteByEmail(email: String) {
        return this.usersModel.findOneAndDelete({ email: email }).exec();
    }
}
