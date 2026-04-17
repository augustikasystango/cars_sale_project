import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreatUserDto, UpdateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { User } from './user.entity';
import { CurrentUser } from './decorators/current-user.decorator';
import { CurrentUserInterceptor } from './interceptors/current-user.interceptor';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
@Serialize(UserDto)
// this wires up the CurrentUserInterceptor to run on every route handler in this controller, so we don't have to add it to every route handler individually, and it will run before any route handler is executed, so we can set the current user on the request object before any route handler is executed, and we can access the current user in any route handler by using the @CurrentUser() decorator, which will extract the current user from the request object and return it to us.
// @UseInterceptors(CurrentUserInterceptor)

export class UsersController {
  constructor(private usersService: UsersService , private authService: AuthService) {}

  @Post('/signout')
  signout(@Session() session: any) {
    session.userId = null;
  }

  @Post('/signup')
  async createUser(@Body() body: CreatUserDto,@Session() session: any) {
    const user = await this.authService.signup(body.email, body.password);
    session.userId = user.id;

    return user;
  }
  //creatin a route handler which will be allowes to access when the user is authenticated, and it will return the user data if the user is authenticated, otherwise it will return an error message.

  // @Serialize(UserDto)
  // @Get('/whoami')
  // whoAmI(@Session() session: any) {
  //   return this.usersService.findOne(session.userId);
  // }
  //if the user is not signed in , we are sending 403
  @UseGuards(AuthGuard)
  @Get('/whoami')
  //making a custom parameter decorator to get the user data from the session, and we can use it in any route handler that we want to get the user data from the session.
  whoAmI(@CurrentUser() user: User) {
    return user;
  }


  @Post('/signin')
  async signin(@Body() body: CreatUserDto,@Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.usersService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return user;
  }
  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }
  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id));
  }
  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(parseInt(id), body);
  }
}
