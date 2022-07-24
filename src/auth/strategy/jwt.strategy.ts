import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(config: ConfigService, private prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get('JWT_SECRET')
        });
    }

    // Se achar o usuário, inclui um objeto user no Request do express, se não da unautorized status 401
    async validate(payload: { sub: number; email: string; }) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: payload.sub
            }
        });
        delete user.hash;
        return user;
    }
}