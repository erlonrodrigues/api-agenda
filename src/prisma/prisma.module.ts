import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

/**
 * PrismaModule é um módulo que provê o PrismaService para a aplicação
 * 
 * O decorator @Global() indica que este módulo é global, uma vez importado no módulo raiz (AppModule),
 * o PrismaService estará disponível em qualquer outro módulo sem a necessidade de importar o PrismaModule repetidamente
 */

@Global()
@Module({
  providers: [PrismaService], // declara o PrismaService como um provedor que será instanciado pelo contêiner de injeção de dependência do NestJS
  exports: [PrismaService], // exporta o PrismaService para que ele possa ser injetado em classes de outros módulos
})
export class PrismaModule { }
