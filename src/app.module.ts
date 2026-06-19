import { Module } from '@nestjs/common'; // importa a biblioteca nestjs para criar o módulo
import { ConfigModule } from '@nestjs/config'; // importa o módulo de configuração
import { AppController } from './app.controller'; // importa o controller da aplicação
import { AppService } from './app.service'; // importa o service da aplicação

@Module({
  imports: [    
    ConfigModule.forRoot({ 
      isGlobal: true, // torna as variáveis de ambiente globais
      envFilePath: ['.env.local', '.env'] // carrega as variáveis de ambiente local e do projeto  
    }), // carrega as variáveis de ambiente
  ],
  controllers: [AppController], // controllers da aplicação
  providers: [AppService], // services da aplicação
})
export class AppModule {} // exporta o módulo principal da aplicação
