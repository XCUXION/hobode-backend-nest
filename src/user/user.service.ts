import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from 'src/auth/auth.types';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async getUserDetails(userId : string) : Promise<IUser> {
        return await this.prisma.user.findUnique({where : {id : userId}})
    }
}
