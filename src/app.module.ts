import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ReportsModule } from './reports/reports.module';
import { User } from './users/user.entity';
import { Report } from './reports/report.entity';
import { ConfigModule,ConfigService } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, //makes the configuration available globally in the application, so we don't have to import the ConfigModule in every module that we want to use the configuration in.
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`, //specifies the path to the environment file that we want to use, and we are using an environment variable to specify the name of the environment file, so we can easily switch between different environment files for different environments (e.g. development, testing, production) without having to change the code.
    }),
  //   TypeOrmModule.forRoot({
  //   type: 'sqlite',
  //   database: 'db.sqlite', 
  //   entities: [User, Report], //stores all entities in the project, so we don't have to import them one by one
  //   synchronize: true,//automatically creates tables in the database based on our entities, and keeps them in sync with our code. This is very useful during development, but should be turned off in production to avoid accidental data loss.
  // }), UsersModule, ReportsModule],

  //we can also use the forRootAsync method to configure the TypeOrmModule asynchronously, which allows us to use the ConfigService to get the database configuration from the environment variables, and we can also use it to load the configuration from a configuration file or a remote configuration service if we want to.
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (config: ConfigService) => {
      return {
        type: 'sqlite',
        database: config.get<string>('DB_NAME'),
        entities: [User, Report],
        synchronize: true,
      };
    },
  }), UsersModule, ReportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
