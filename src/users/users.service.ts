import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { CustomBadRequestException } from 'src/common/exceptions/CustomBadRequestException';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  saltOrRounds = 10;
  constructor(private readonly userRepository: UsersRepository){}

  async create(createUserDto: CreateUserDto) {
    const checkifEmailIdExists = await this.findOne(createUserDto.email);
    if(checkifEmailIdExists){
      throw new CustomBadRequestException("User with this same email id exists!");
    }
    const checkifUsernameExists = await this.findOneByUserName(createUserDto.username);
    if(checkifUsernameExists){
      throw new CustomBadRequestException("Username taken");
    }
    const unhashedPassword  = createUserDto.password;
    const hashedPassword = await this.hashedPassword(unhashedPassword);
    createUserDto.password = hashedPassword;
    return this.userRepository.create(createUserDto);
  }

  async login(loginUserDto: LoginUserDto){
    try{
      const data = await this.findOne(loginUserDto.email);
      const isPasswordMatched  = await bcrypt.compare(loginUserDto.password, data.password);
      if(isPasswordMatched){
        return data;
      }
    }catch(e){
      throw  new Error();
    }
  }


  async getUserData(user_id: number){
    try{
      const user = await this.findOneById(user_id);
      delete user.password;
      return user;
    }catch(e){
      throw  new Error();
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(email: string) {
    return this.userRepository.findOneWhere({
        email,
      });
  }

  findOneById(id: number) {
    return this.userRepository.findOneWhere({
        id
    });
  }

  findOneByUserName(username:string) {
    return this.userRepository.findOneWhere({
      username,
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOneById(id);
    if(!user){
      throw new CustomBadRequestException("This user doesnot exist!");
    }
    const matchedUsername = await this.findOneByUserName(updateUserDto.username);
    if(matchedUsername){
      throw new CustomBadRequestException("Username is already taken.");
    }
    await this.userRepository.updateOne({id} , updateUserDto);
    return this.findOneById(id);
  }

  remove(id: number) {
    return this.userRepository.delete({id});
  }

  private hashedPassword(unhashedPassword: string){
    return bcrypt.hash(unhashedPassword,this.saltOrRounds)
  }
}
