import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])], //import the User entity into the module, so we can use it in the service
  controllers: [UsersController],
  providers: [UsersService, AuthService],
})
export class UsersModule {}
