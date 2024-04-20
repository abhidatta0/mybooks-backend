import { Controller, Get, Post, Body, Patch, Param, Delete} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService, private readonly configService: ConfigService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);
    return {success: true};
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  private getAccessToken(userId: number){
    const payload = {sub: userId};
    return this.jwtService.signAsync(payload,{secret: this.configService.get("JWT_ACCESS_TOKEN_SECRET")});
  }
}
