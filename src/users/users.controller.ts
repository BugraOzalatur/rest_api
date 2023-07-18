import { BadRequestException, Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserService } from "./users.service";
import { User } from "./users.entity";
import { CreateUserDto } from "./dtos/createUser.dto";
import { validate } from "class-validator";
import { UpdateUserDto } from "./dtos/updateUser.dto";

@Controller('User')
export class userController{
    constructor(
        private readonly userService:UserService
    ){}
    @Post()
    async createUser(@Body() createUserDto:CreateUserDto):Promise<User>{
        const errors=await validate(createUserDto);
        if (errors.length > 0) {
            throw new BadRequestException(errors);
          }
          return this.userService.createUser({userData:createUserDto});
    }
    @Get(':id')
    async getUser(@Param('id') id:number):Promise<User|undefined>{
        return this.userService.findUser(id);
    }
    @Delete(':id')
    async removeUser(@Param('id') id:number):Promise<void>{
        await this.userService.removeUser(id);
    }
    @Get('getAllUsers')
    async getAllUser():Promise<User[]>{
        return this.userService.getAllUser();
    }
@Put(':id')
async updateUser(@Param('id') id:number,@Body() updateUserDto:UpdateUserDto):Promise<User|undefined>
    {
        return this.userService.updateUser(id,updateUserDto);
    }
}