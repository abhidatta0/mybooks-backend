import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  saltOrRounds = 10;
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>){}

  async create(createUserDto: CreateUserDto) {
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
    return this.userRepository.findOneOrFail({
      where:{
        email
      },
      
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private hashedPassword(unhashedPassword: string){
    return bcrypt.hash(unhashedPassword,this.saltOrRounds)
  }
}
