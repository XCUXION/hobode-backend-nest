import { BadRequestException, Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { IUser } from "./auth.types";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("signUp")
    async signUp(@Body() body : IUser){
        return await this.authService.signUp(body)
    }

    @Post("login")
    async login(@Body() body : {email : string, password : string}){
        const {email, password} = body
        return await this.authService.login(email, password)
    }
}