import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    // Com o req do express, sem tipagem DTO para o que vem do request
    // @Post('signup')
    // signup(@Req() req: Request) {
    //     console.log(req.body)
    //     return this.authService.signup()
    // }

    @Post('signup')
    signup(@Body() dto: AuthDto) {
        console.log({ dto: dto })
        return this.authService.signup()
    }
}
