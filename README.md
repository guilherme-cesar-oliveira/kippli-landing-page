# Kippli | Landing Page

Landing page de página única para venda do Kippli, um CRM completo para operações comerciais. Construída com Vite + React.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Publicar com um comando

Com o `git` e o `gh` instalados e a conta guilherme logada no `gh`, rode na pasta do projeto:

```bash
npm run publicar
```

O script cria o repositório (se não existir), envia o código, ativa o GitHub Pages e dispara o deploy. Pode ser executado de novo a cada alteração. Para usar outro nome de repositório: `npm run publicar -- nome-do-repo`.

## Deploy

O deploy para o GitHub Pages é automático a cada push na branch `main`, via GitHub Actions (`.github/workflows/deploy.yml`). O site é publicado no domínio próprio [kippli.com.br](https://kippli.com.br), configurado via `public/CNAME` e nas configurações de Pages do repositório.

## Configuração pendente

Os botões de WhatsApp em [`src/data/content.js`](src/data/content.js) apontam para um número placeholder (`5500000000000`). Troque pelo número real do WhatsApp comercial.
