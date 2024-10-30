import { BadRequestException, Controller, Get, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/guards/jwt.guards";
import { OwnerService } from "./owner.service";
import { JwtPayload } from "src/types/@types";
import { User } from "src/decorators/user.decorator";

@Controller("user")
export class UserController {
    constructor(private ownerService: OwnerService) {}

    @UseGuards(JwtAuthGuard)
    @Get("getUserDetails")
    async getAllUsers(@User() user : JwtPayload){
        try {
            return await this.ownerService.getOwnerDetails(user.userId)
        } catch (error : any) {
            throw new BadRequestException(error.message)
        }
    }
}