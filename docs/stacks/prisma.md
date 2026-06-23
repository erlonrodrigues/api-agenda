# Guia de instalação e configuração do Prisma ORM com PNPM

Este guia descreve como instalar, configurar e gerenciar a estrutura do seu banco de dados utilizando o Prisma e o gerenciador de pacotes `pnpm`.

## 1. Instalação

Para começar, você precisa instalar a CLI do Prisma como dependência de desenvolvimento e o client como dependência de produção:

```bash
# Instala a CLI para comandos no terminal
pnpm add -D prisma

# Instala o Client para usar no código (geralmente mesma versão)
pnpm add @prisma/client
```

---

## 2. Inicialização

Para criar a estrutura inicial (pasta `prisma/` e arquivo `.env`):

```bash
pnpm prisma init
```

---

## 3. Fluxo de Trabalho (Migrations)

O Prisma utiliza o arquivo `schema.prisma` como fonte de referência.

### Cenário A: Banco de Dados Vazio (ou em Desenvolvimento)

Quando você cria ou altera um `model` no arquivo `.prisma` e quer que essas mudanças reflitam no banco:

```bash
pnpm prisma migrate dev --name nome_da_alteracao
```
* **O que faz:** Cria um arquivo SQL de migração, aplica no banco e atualiza o Prisma Client (tipagem).
* **Uso:** É o comando padrão durante o desenvolvimento.

### Cenário B: Banco de Dados já existente (com tabelas criadas manualmente)

Se você já tem tabelas no banco de dados e quer que o Prisma utilize ele (Introspecção):

```bash
pnpm prisma db pull
```
* **O que faz:** Lê o seu banco de dados e atualiza o arquivo `schema.prisma` automaticamente para refletir as tabelas existentes.
* **Uso:** Útil ao começar o Prisma em um projeto legado ou banco já populado.

### Cenário C: Sincronização Rápida (Sem criar arquivos de Migração)

Se você quer apenas testar algo rápido no banco sem gerar arquivos SQL:

```bash
pnpm prisma db push
```
* **O que faz:** Empurra as alterações do schema direto para o banco.
* **Aviso:** Não cria histórico de migrações. Use com cautela.

---

## 4. Reset de Ambiente (Desenvolvimento)

Para limpar completamente o banco e reaplicar todas as migrações:

```bash
pnpm prisma migrate reset
```
* **Atenção:** Apaga todos os dados e recria o esquema a partir das migrações existentes. Ideal para ambientes de desenvolvimento.

---

## 5. Comandos Essenciais de Apoio

- `pnpm prisma generate` – Atualiza a tipagem do TypeScript no seu `node_modules`. Executado automaticamente pelo `migrate dev`.
- `pnpm prisma studio` – Abre uma interface visual no navegador para visualizar e editar os dados das tabelas.

---

## 6. Resumo de Comandos

| Categoria | Comando | Descrição Didática |
| :--- | :--- | :--- |
| Instalação | `pnpm add -D prisma` | Instala a CLI do Prisma como dependência de desenvolvimento no projeto. |
| Dependência | `pnpm add @prisma/client` | Instala a biblioteca necessária para que o código (TS/JS) consiga interagir com o banco. |
| Configuração | `pnpm prisma init` | Cria a estrutura inicial: pasta `/prisma`, arquivo `schema.prisma` e o `.env`. |
| Desenvolvimento | `pnpm prisma migrate dev` | Sincroniza o schema com o banco. Pede um nome se houver alterações novas. |
| Desenvolvimento (nomeado) | `pnpm prisma migrate dev --name <nome>` | Cria uma migração com nome específico (ex: `add_users`). Ideal para manter o histórico organizado. |
| Tipagem | `pnpm prisma generate` | Atualiza o Prisma Client. Garante que o autocompletar (IntelliSense) reconheça as novas tabelas. |
| Visualização | `pnpm prisma studio` | Abre uma interface gráfica no navegador para gerir os dados do banco sem SQL. |
| Reset/Limpeza | `pnpm prisma migrate reset` | **Atenção**: Apaga todos os dados e recria o banco do zero (útil em dev). |
| Dados Iniciais | `pnpm prisma db seed` | Executa o script de "semeadura" para popular o banco com dados de teste. |
| Produção | `pnpm prisma migrate deploy` | Aplica as migrações existentes num ambiente de produção (não cria novas nem pede nomes). |