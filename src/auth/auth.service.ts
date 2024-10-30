import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { IUser } from './auth.types';
import * as bcrypt from 'bcrypt';
import { createUserDTO } from './dto/createUser.dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) {}
    saltRounds = 10;

    async signUp(user: createUserDTO): Promise<IUser> {
        try {
            const salt = await bcrypt.genSalt(this.saltRounds);
            const passwordHash = await bcrypt.hash(user.password, salt);
            return await this.prisma.user.create({
                data: { ...user, password: passwordHash }
            });
        } catch (error: any) {
            throw new BadRequestException(error.message);
        }
    }

    async login(email: string, password: string) {
        try {
            const user = await this.prisma.user.findFirst({ where: { email } });
            if (!user) {
                throw new BadRequestException(`Email or password is incorrect`);
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                throw new BadRequestException(`Email or password is incorrect`);
            }

            const payload = { email: user.email, userId: user.id };
            const token = this.jwtService.sign(payload);

            return { message: 'Login successful', token };
        } catch (error: any) {
            throw new BadRequestException(error.message);
        }
    }
}
