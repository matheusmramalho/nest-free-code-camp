import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
    (data: string | undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();

        // Se passar parametro, como por exemplo o e-mail, pode passar apenas o e-mail do usuario ao inves do objeto inteiro
        if (data) {
            return request.user[data];
        }
        return request.user;
    },
); 