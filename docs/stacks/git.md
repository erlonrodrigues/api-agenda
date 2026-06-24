# Git

## Rastreamento de permissões em sistema de arquivos NTFS no Linux

Ao clonar esse repositório em um HD externo ou partição formatada com **NTFS**, utilizando uma máquina host com Linux, pode se deparar com uma situação onde o Git marca todos os arquivos do repositório como modificados logo após o clone, mesmo sem ter alterado nenhuma linha de código.

### Por que isso acontece?

O sistema Linux utiliza um sistema de permissões rigoroso para cada arquivo (leitura, escrita e execução), mas o sistema de arquivos NTFS (da Microsoft/Windows) não suporta essas mesmas permissões nativamente. Quando o Linux monta o disco NTFS, ele precisa adaptar as permissões para os arquivos e acaba aplicando uma permissão padrão genérica para tudo — geralmente, marcando todos os arquivos como executáveis.

O Git, por padrão, rastreia as mudanças de permissões dos arquivos (o famoso *executable bit*). Como o Linux faz todos os arquivos parecerem executáveis devido ao disco NTFS, o Git interpreta que a permissão de todos eles mudou e os marca como modificados.

### Como resolver

Para corrigir esse problema, é necessário instruir o Git a **ignorar as alterações de permissões de arquivo** neste repositório específico.

Para isso, deve-se abrir o terminal, navegar até a pasta do repositório no HD externo e executar o seguinte comando:

```bash
git config --local core.filemode false
```

- `--local`: Garante que a configuração seja aplicada apenas a este repositório, não afetando outros projetos.
- `core.filemode false`: Desabilita o rastreamento do modo do arquivo (permissões). Assim, o Git passará a olhar apenas para as modificações no conteúdo real do texto.
