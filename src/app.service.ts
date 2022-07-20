import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  /**
   *
   */
  constructor(private prismaService: PrismaService) {

  }

  async getHello() {

    const teste = await this.prismaService.t_cliente_lab.findFirst({
      where: {
          NOME_DE_FANTASIA: '03- ASTOLFO DUTRA'
      }
    });

    console.log(teste)

    return 'teste';
  }
}
