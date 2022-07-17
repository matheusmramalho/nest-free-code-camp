import { ForbiddenException, Injectable } from '@nestjs/common';
import { User, Bookmark } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService) { }

    async signup(dto: AuthDto) {
        // generate the password hash
        // const hash = await argon.hash(dto.password)

        try {
            // save the new user in DB
            const user = await this.prismaService.user.create({
                data: { email: dto.email, hash: dto.password }
            });

            // return the saved user
            return user
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
        const user = await this.prismaService.user.findFirst({
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
        if (pwMatches) {
            throw new ForbiddenException('Usuário ou senha inválido');
        }

        // Retorna u usuário sem o password
        delete user.hash;
        return user;
    }
}
