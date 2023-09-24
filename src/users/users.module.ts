import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Users, UsersSchema } from './schema/user.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Users.name,
      schema: UsersSchema,
    }])
  ],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule { }
