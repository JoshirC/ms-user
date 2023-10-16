import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type UsersDocument = HydratedDocument<Users>;

@Schema()

export class Users {
    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    name: string;

    @Prop()
    lastName: string;

    @Prop()
    token: string;
}
export const UsersSchema = SchemaFactory.createForClass(Users);