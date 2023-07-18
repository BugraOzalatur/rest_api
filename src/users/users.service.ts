import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./users.entity";
import { Repository } from "typeorm";
import { UpdateUserDto } from "./dtos/updateUser.dto";

@Injectable()
export class UserService{
constructor(
    @InjectRepository(User)
    private readonly userRepository:Repository<User>,    
){}
async createUser({userData}:{userData:Partial<User>}):Promise<User>{
 const newUser=this.userRepository.create(userData);
 return this.userRepository.save(newUser);   
}
async findUser(id:number):Promise<User|undefined>{
    const isHere=await this.userRepository.findOne({where:{id:id}});
  if(isHere){
    return isHere;
  }
  else{
    return null;
  }
}
async removeUser(id:number):Promise<void>{
await this.userRepository.delete(id);}
async getAllUser():Promise<User[]>{
    return this.userRepository.find();
}
async updateUser(id:number,updateUserDto:UpdateUserDto):Promise<User|undefined>
{
    const user=await this.findUser(id);
    if(user){
        Object.assign(user,updateUserDto)
        return this.userRepository.save(user);
    }
return undefined;
}
}