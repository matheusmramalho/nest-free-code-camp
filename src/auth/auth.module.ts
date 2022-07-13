import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  // imports: [PrismaModule], Não precisa pq ta global
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
