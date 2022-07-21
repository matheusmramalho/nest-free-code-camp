import { ForbiddenException, Injectable } from '@nestjs/common';
import { User, Bookmark } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        private jwt: JwtService,
        private config: ConfigService) { }

    async signup(dto: AuthDto) {
        // generate the password hash
        // const hash = await argon.hash(dto.password)

        try {
            // save the new user in DB
            const user = await this.prismaService.user.create({
                data: { email: dto.email, hash: dto.password }
            });
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') { // Codigo P2002 é erro de chave unica, emial so pode ser um no usuario
                    throw new ForbiddenException('Email ja existe');
                }
            }
            throw error;
        }
    }

    async signin(dto: AuthDto) {
        const user = await this.prismaService.user.findUnique({
            where: {
                email: dto.email,
            }
        });

        // Caso não exista o email cadastrado, ja estoura erro generico de login
        if (!user) {
            throw new ForbiddenException('Usuário ou senha inválido');
        }

        const pwMatches = user.hash === dto.password;

        // Senha incorreta
        if (!pwMatches) {
            throw new ForbiddenException('Usuário ou senha inválido');
        }

        return this.signToken(user.id, user.email);
    }

    private async signToken(userId: number, email: string): Promise<{ access_token: string }> {
        const payload = {
            sub: userId,
            email
        }
        const secret = this.config.get('JWT_SECRET')
        const token = await this.jwt.signAsync(payload, {
            expiresIn: "15m",
            secret: secret
        });
        return {
            access_token: token
        }
    }
}
