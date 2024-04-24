import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUserDto } from './dto/login-user.dto';
import { CustomBadRequestException } from 'src/common/exceptions/CustomBadRequestException';

@Injectable()
export class UsersService {
  saltOrRounds = 10;
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){}

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
    return this.userRepository.save(createUserDto);
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

  findAll() {
    return `This action returns all users`;
  }

  findOne(email: string) {
    return this.userRepository.findOne({
      where:{
        email
      },
      
    });
  }

  findOneById(id: number) {
    return this.userRepository.findOne({
      where:{
        id
      },
    });
  }

  findOneByUserName(username:string) {
    return this.userRepository.findOne({
      where:{
        username,
      },
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
    await this.userRepository.update({id} , updateUserDto);
    return this.findOneById(id);
  }

  remove(id: number) {
    return this.userRepository.delete({id});
  }

  private hashedPassword(unhashedPassword: string){
    return bcrypt.hash(unhashedPassword,this.saltOrRounds)
  }
}
