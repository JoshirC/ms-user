import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Users } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersDTO } from './dto/users.dto';
import { emailDTO } from './dto/email.dto';
import { dataDTO } from './dto/data.dto';
import { PasswordDTO } from './dto/password.dto';
import * as bcryptjs from 'bcrypt';
import * as nodemailer from 'nodemailer';
import axios from 'axios';

const communicateWithTeams = async ({ newEmail, email }: emailDTO) => {
    try {
        const response = await axios.put(`${process.env.MS_TEAMS}/Member/updateMail/${email}`, {
            newEmail,
        });
    } catch (error) {
        console.log('COMUNICACIÓN EQUIPO');
        console.log(error.response.data);
    }
};

const deleteMemberByMail = async (email:string) => {
    try{
        const response = await axios.delete(`${process.env.MS_TEAMS}/Member/deleteAcount/${email}`);
    }
    catch (error) {
        console.log(error.response.data);
    }
}

const deleteTasksByMail = async (email:string) => {
    try{
        const response = await axios.delete(`${process.env.MS_TASKS}/Tasks/deleteUserTasks/${email}`);
    }
    catch(error){
        console.log(error.response.data);
    }
}

const getIfAdmin = async (email:string) => {
    try{
        const response = await axios.get(`${process.env.MS_TEAMS}/Member/getIfAdmin/${email}`);
        return response.data;
    }
    catch(error){
        console.log(error.response.data);
    }
}

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

    async findOneUser(email: string) {
        const user = this.usersModel.findOne({ email: email });
        return user;
    }

    async updateEmail({ newEmail, email }: emailDTO) {
        const data = await this.usersModel.findOne({ newEmail: newEmail });

        if (!data) {
            const user = await this.usersModel.findOne({ email: email });
            user.email = newEmail;
            await user.save();
            communicateWithTeams({ newEmail, email });
            return user;
        } else {
            throw new HttpException('EMAIL FOUND', HttpStatus.BAD_REQUEST);
        }
    }

    async updateData({ email, name, lastName }: dataDTO) {
        const data = await this.usersModel.findOne({ email: email });
        if (!data) {
            throw new HttpException('EMAIL NOT FOUND', HttpStatus.BAD_REQUEST);
        } else {
            data.name = name;
            data.lastName = lastName;
            await data.save();
            return data;
        }
    }
    
    async sendPasswordMail(email:string){
        try{
            const user = await this.findOneByEmail(email);
            const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+"; // Caracteres permitidos en la contraseña
            let Newpassword = '';

            for (let i = 0; i < 8; i++) {
                const randomIndex = Math.floor(Math.random() * charset.length);
                Newpassword += charset[randomIndex];
            }

            const transporter = nodemailer.createTransport({
                host: process.env.NODEMAILER_HOST,
                port: process.env.NODEMAILER_PORT,
                secure: process.env.NODEMAILER_SECURE,
                auth:{
                    user: process.env.NODEMAILER_USER,
                    pass: process.env.NODEMAILER_PASS,
                }
            });
            const mailOptions={
                from: process.env.NODEMAILER_USER,
                to: user.email,
                subject: 'Restablecimiento de Contraseña',
                text: `Tu contraseña de recuperación es: ${Newpassword}`
            };
            await transporter.sendMail(mailOptions);
            const hashPassword = await bcryptjs.hash(Newpassword,10);
            user.password = hashPassword;
            await user.save();
            return user;
        }
        catch(error){
            throw new Error(error.message);
        }
    }

    async updatePassword({ email, password, newPassword, repeatPassword }: PasswordDTO) {
        const user = await this.usersModel.findOne({ email: email });
        if (!user) {
            throw new HttpException('EMAIL NOT FOUND', HttpStatus.BAD_REQUEST);
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (isMatch) {
            if (newPassword !== repeatPassword || newPassword === password) {
                throw new HttpException('NEW PASSWORD INVALID', HttpStatus.BAD_REQUEST);
            }
            const hashPassword = await bcryptjs.hash(newPassword, 10);
            user.password = hashPassword;
            await user.save();
            return user;
        } else {
            throw new HttpException('CURRENT PASSWORD INVALID', HttpStatus.BAD_REQUEST);
        }
    }

    async deleteUser(email: string): Promise<void> {
        if (!(await getIfAdmin(email))) {
            await deleteMemberByMail(email);
            await deleteTasksByMail(email);
            await this.usersModel.findOneAndDelete({ email: email });
        }
        else{
            throw new HttpException('No puede eliminar teniendo equipos como administrador', HttpStatus.BAD_REQUEST);
        }
    }
}
