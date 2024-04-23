import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException, Res} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ConfigService } from '@nestjs/config';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';
import { Public } from 'src/auth/public.decorator';
import { CustomBadRequestException } from 'src/common/exceptions/CustomBadRequestException';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService, private readonly configService: ConfigService) {}

  @Post()
  @Public()
  async create(@Body() createUserDto: CreateUserDto) {
    await this.usersService.create(createUserDto);
    return {success: true};
  }

  @Post('login')
  @Public()
  async login(@Body() loginUserDto: LoginUserDto, @Res({passthrough: true}) response: Response){
    try{
      const data = await this.usersService.login(loginUserDto);
      delete data.password;
      const accessToken = await this.getAccessToken(data.id);
      response.cookie("access-token",accessToken,{httpOnly: true});
      return data;
    }catch(e){
      throw  new CustomBadRequestException("Invalid credentials");
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const data =await this.usersService.remove(+id);
    if(data.affected > 0){
      return {success: true}
    }
    else{
      throw new CustomBadRequestException("No user exists with such id")
    }
  }

  private getAccessToken(userId: number){
    const payload = {sub: userId};
    return this.jwtService.sign(payload,{secret: this.configService.get("JWT_ACCESS_TOKEN_SECRET"),
    expiresIn: '3d'
    });
  }
}
