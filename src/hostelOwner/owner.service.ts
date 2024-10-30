import { Injectable, NotFoundException } from '@nestjs/common';
import { IUser } from 'src/auth/auth.types';
import { PrismaService } from 'src/prisma.service';
import { CreateHostelOwnerDTO } from './owner.types';

@Injectable()
export class OwnerService {
    constructor(private prisma: PrismaService) {}

    async getOwnerDetails(userId : string) : Promise<IUser> {
        return await this.prisma.user.findUnique({where : {id : userId}})
    }

    async createHostelOwner(details : CreateHostelOwnerDTO) : Promise<IUser>{
        return await this.prisma.hostelOwner.create({data : details})
    }
}
