import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Request } from 'express';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';

@UseGuards(JwtGuard) // Todas as requisições para essa controller precisa ter o token, ou seja, precisa ter autorização através de login
@Controller('users')
export class UserController {

    @Get('me')
    getMe(@GetUser() user: User) {
        console.log({
            user: user
        });
        return user;
    }
}
