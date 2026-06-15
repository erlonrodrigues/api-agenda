import { NestFactory } from '@nestjs/core'; // biblioteca para criar a aplicação NestJS
import { ConfigService } from '@nestjs/config'; // biblioteca para carregar as variáveis de ambiente
import { AppModule } from './app.module'; // módulo principal da aplicação

async function bootstrap() {
  const app = await NestFactory.create(AppModule); // cria a aplicação NestJS
  const configService = app.get(ConfigService); // carrega as variáveis de ambiente
  const port = configService.get<number>('PORT', 3000); // carrega a porta do arquivo .env

  await app.listen(port); // inicia o servidor na porta especificada
}

// função principal que inicia a aplicação
bootstrap();
