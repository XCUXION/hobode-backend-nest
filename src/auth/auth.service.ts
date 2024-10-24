import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { IUser } from './auth.types';
import * as bcrypt from 'bcrypt'
import { createUserDTO } from './dto/createUser.dto';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}
    saltRounds = 10;

    async signUp(user : createUserDTO) : Promise<IUser> {
        try {
            const salt = await bcrypt.genSalt(this.saltRounds);
            if(salt){
                const passwordHash = await bcrypt.hash(user.password, salt)
                return await this.prisma.user.create(
                    {data : {
                        ...user,
                        password : passwordHash
                    }}
                )
            }
        } catch (error : any) {
            throw new BadRequestException(error.message)
        }
    }

    async login(email : string, password : string){
        try {
            const user = await this.prisma.user.findFirst({where : {email}})
            if(!user)
                throw new BadRequestException(`Email or password is incorrect`)
            const checkPassoword = await bcrypt.compare(password, user.password)
            if(!checkPassoword)
                throw new BadRequestException(`Email or password is incorrect`)
            return "Login successful"
        } catch (error : any) {
            throw new BadRequestException(error.message)
        }
    }
}
