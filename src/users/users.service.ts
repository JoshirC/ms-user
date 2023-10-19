import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Users } from './schema/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersDTO } from './dto/users.dto';
import { JwtService } from '@nestjs/jwt';
import { emailDTO } from './dto/email.dto';
import { error } from 'console';
import { dataDTO } from './dto/data.dto';
import { PasswordDTO } from './dto/password.dto';
import * as bcryptjs from 'bcrypt';
import * as nodemailer from 'nodemailer';
import { retry } from 'rxjs';

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

            for (let i = 0; i < length; i++) {
                const randomIndex = Math.floor(Math.random() * charset.length);
                Newpassword += charset[randomIndex];
            }

            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth:{
                    user: process.env.NODEMAILER_USER,
                    pass:process.env.NODEMAILER_PASS
                }
            });
            const mailOptions={
                from: process.env.NODEMAILER_USER,
                to: user.email,
                subject: 'Restablecimiento de Contraseña',
                text: `Tu contraseña de recuperación es: ${Newpassword}`
            };
            const NewhashPassword = await bcryptjs.hash(Newpassword,10);
            user.password = NewhashPassword;
            return user;
        }
        catch(error){
            return -1;
        }
    }

    async updatePassword({ email, password, newPassword, repeatPassword }: PasswordDTO) {
        // Buscar el usuario por correo electrónico
        const user = await this.usersModel.findOne({ email: email });
        // Verificar si el usuario existe
        if (!user) {
            throw new HttpException('EMAIL NOT FOUND', HttpStatus.BAD_REQUEST);
        }
        // Comparar la contraseña actual con la contraseña almacenada en la base de datos
        const isMatch = await bcryptjs.compare(password, user.password);
        // Si las contraseñas coinciden
        if (isMatch) {
            // Verificar si la nueva contraseña y la confirmación coinciden, y si la nueva contraseña es igual a la contraseña actual
            if (newPassword !== repeatPassword || newPassword === password) {
                throw new HttpException('NEW PASSWORD INVALID', HttpStatus.BAD_REQUEST);
            }
            // Generar el hash de la nueva contraseña
            const hashPassword = await bcryptjs.hash(newPassword, 10);
            // Actualizar la contraseña en el modelo de usuario
            user.password = hashPassword;
            // Guardar los cambios en la base de datos
            await user.save();
            return user;
        } else {
            throw new HttpException('CURRENT PASSWORD INVALID', HttpStatus.BAD_REQUEST);
        }
    }
}
