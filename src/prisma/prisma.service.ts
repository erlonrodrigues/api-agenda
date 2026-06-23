import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * PrismaService é um serviço responsável por gerenciar a conexão e o ciclo de vida do Prisma ORM.
 * Estende a classe genérica PrismaClient (gerada com base no schema) para herdar todos os métodos de acesso aos modelos.
 * Implementa as interfaces OnModuleInit e OnModuleDestroy do NestJS para o controle de ciclo de vida.
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {

  // constructor inicializa a instância do Prisma Client   
  constructor() {
    // Chamada do construtor da classe pai (PrismaClient).
    super();
  }

  /**
   * onModuleInit é um hook executado pelo NestJS durante a inicialização deste módulo.
   * Estabelece a conexão com o banco de dados proativamente.
   * Embora as versões recentes do Prisma conectem via "lazy load" (na primeira query),
   * o uso explícito do $connect() garante que a aplicação falhe rapidamente (fail-fast)
   * na inicialização caso o banco de dados esteja indisponível.
   */
  async onModuleInit() {
    await this.$connect();
  }

  /**
   * onModuleDestroy é um hook executado pelo NestJS durante o encerramento da aplicação (graceful shutdown).
   * Encerra a conexão com o banco de dados de forma segura, o que é uma boa prática
   * para evitar conexões pendentes (connection leaks) e garantir que as transações finalizem corretamente.
   */
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
