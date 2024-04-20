import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private hashedPassword(unhashedPassword: String){
    // Convert String object to primitive string
    const plainTextPassword = unhashedPassword.toString();
    return bcrypt.hash(plainTextPassword,this.saltOrRounds)
  }
}
