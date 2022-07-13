import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';


export interface teste {
 nome: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(params: teste): string {
    return this.appService.getHello();
  }
}
