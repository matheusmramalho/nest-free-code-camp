import { Injectable } from '@nestjs/common';
import { User, Bookmark } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class AuthService {


    constructor(private prismaService: PrismaService) {

    }
    signup() {
        // const user: User = {
        //     firstName: '123'
        // }

        
    }
}
