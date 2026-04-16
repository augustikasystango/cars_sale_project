import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes,scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { User } from "./user.entity";

const scrypt = promisify(_scrypt);


@Injectable()
export class AuthService{
    constructor (private usersService: UsersService){

    }
    async signup(email: string, password: string){
        //see if the email is in use 
        
        const users = await this.usersService.find(email);
        if(users.length){
            throw new BadRequestException('email in use');
        }
        //hash user's password
        //generate the saltt

        const salt = randomBytes(8).toString('hex');
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        const result = salt + '.' + hash.toString('hex');

        const user = await this.usersService.create({email,password: result});

        //returns  the s
        //has the salt & the password together
        //salt & hash the password together

        //create new use & sve it
        //return the user
         
        return user;
        

    }
   async signin(email: string, password: string){
        const [user] = await this.usersService.find(email);
        if(!user){
            throw new BadRequestException('User not found');
        }
        const [salt, storedHash] = user.password.split('.');

        const hash = (await scrypt(password, salt, 32)) as Buffer;

        if(storedHash !== hash.toString('hex')){
            throw new BadRequestException('Invalid password');
        }
        return user;
    }

    
}
