#!/usr/bin/env node
// Publica o site no GitHub Pages com um único comando:  npm run publicar
//
// O que faz (e pode ser executado várias vezes):
//   1. Seleciona a conta do gh que contém "guilherme" no nome
//   2. Cria o repositório (se ainda não existir) e configura o remote "origin"
//   3. Faz commit das alterações e push para a branch main
//   4. Ativa o GitHub Pages com origem "GitHub Actions"
//      (o workflow .github/workflows/deploy.yml faz o build e o deploy)

import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ACCOUNT_MATCH = /guilherme/i; // conta do gh a ser usada
const REPO_NAME = process.argv[2] || 'lp-kipplicrm';
const BRANCH = 'main';
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const log = (msg) => console.log(`\n▶ ${msg}`);
const fail = (msg) => {
  console.error(`\n✖ ${msg}`);
  process.exit(1);
};

// Executa um comando e devolve a saída; com allowFail devolve null em caso de erro.
function run(cmd, args, { allowFail = false, inherit = false } = {}) {
  const res = spawnSync(cmd, args, {
    cwd: ROOT,
    encoding: 'utf8',
    stdio: inherit ? 'inherit' : ['ignore', 'pipe', 'pipe'],
  });
  if (res.error) {
    if (allowFail) return null;
    fail(`Não foi possível executar "${cmd}". Ele está instalado e no PATH?`);
  }
  if (res.status !== 0) {
    if (allowFail) return null;
    fail(`Falha em: ${cmd} ${args.join(' ')}\n${(res.stderr || '').trim()}`);
  }
  return (res.stdout || '').trim();
}

// ---------------------------------------------------------------- pré-requisitos
log('Verificando git e gh');
if (run('git', ['--version'], { allowFail: true }) === null) fail('Git não encontrado. Instale em https://git-scm.com');
if (run('gh', ['--version'], { allowFail: true }) === null) fail('GitHub CLI (gh) não encontrado. Instale em https://cli.github.com');

// ---------------------------------------------------------------- conta do gh
log('Selecionando a conta guilherme no gh');
const status = spawnSync('gh', ['auth', 'status', '--hostname', 'github.com'], { encoding: 'utf8' });
const statusText = `${status.stdout || ''}\n${status.stderr || ''}`;
const accounts = [...statusText.matchAll(/account\s+(\S+)/g)].map((m) => m[1]);
const account = accounts.find((a) => ACCOUNT_MATCH.test(a));
if (!account) {
  fail(
    `Nenhuma conta com "guilherme" encontrada no gh (contas: ${accounts.join(', ') || 'nenhuma'}).\n` +
      'Faça login com:  gh auth login',
  );
}
run('gh', ['auth', 'switch', '--hostname', 'github.com', '--user', account], { allowFail: true });
const activeUser = run('gh', ['api', 'user', '--jq', '.login']);
if (activeUser.toLowerCase() !== account.toLowerCase()) {
  fail(`A conta ativa do gh é "${activeUser}", esperado "${account}". Rode: gh auth switch --user ${account}`);
}
console.log(`  Conta ativa: ${activeUser}`);
const fullName = `${activeUser}/${REPO_NAME}`;

// ---------------------------------------------------------------- git local
log('Preparando o repositório local');
if (!existsSync(resolve(ROOT, '.git'))) {
  run('git', ['init', '-b', BRANCH]);
}
run('git', ['checkout', '-B', BRANCH], { allowFail: true });
run('git', ['add', '-A']);
const pending = run('git', ['status', '--porcelain']);
if (pending) {
  const commit = spawnSync('git', ['commit', '-m', 'Publica landing page do Kippli CRM com botão de login'], {
    cwd: ROOT,
    encoding: 'utf8',
  });
  if (commit.status !== 0) {
    fail(
      `Não foi possível criar o commit.\n${(commit.stderr || commit.stdout || '').trim()}\n` +
        'Se for erro de identidade, configure:\n' +
        '  git config --global user.name "Seu Nome"\n' +
        '  git config --global user.email "seu@email.com"',
    );
  }
  console.log('  Commit criado.');
} else {
  console.log('  Nada novo para commitar.');
}

// ---------------------------------------------------------------- repositório remoto
log(`Garantindo o repositório ${fullName}`);
const exists = run('gh', ['repo', 'view', fullName, '--json', 'name'], { allowFail: true }) !== null;
if (!exists) {
  run('gh', ['repo', 'create', fullName, '--public', '--description', 'Landing page do Kippli CRM']);
  console.log('  Repositório criado.');
} else {
  console.log('  Repositório já existe.');
}
const remoteUrl = `https://github.com/${fullName}.git`;
if (run('git', ['remote', 'get-url', 'origin'], { allowFail: true }) === null) {
  run('git', ['remote', 'add', 'origin', remoteUrl]);
} else {
  run('git', ['remote', 'set-url', 'origin', remoteUrl]);
}

// ---------------------------------------------------------------- push (usa as credenciais do gh)
log('Enviando o código para o GitHub');
run('gh', ['auth', 'setup-git', '--hostname', 'github.com'], { allowFail: true });
run('git', ['push', '-u', 'origin', BRANCH], { inherit: true });

// ---------------------------------------------------------------- GitHub Pages
log('Ativando o GitHub Pages (origem: GitHub Actions)');
const pagesApi = `repos/${fullName}/pages`;
const created = run('gh', ['api', '-X', 'POST', pagesApi, '-f', 'build_type=workflow'], { allowFail: true });
if (created === null) {
  // Já existe: apenas garante que a origem seja o GitHub Actions.
  run('gh', ['api', '-X', 'PUT', pagesApi, '-f', 'build_type=workflow'], { allowFail: true });
}

// Em deploys via Actions o arquivo CNAME é ignorado: o domínio próprio precisa ser definido na API.
const cnamePath = resolve(ROOT, 'public', 'CNAME');
const domain = existsSync(cnamePath) ? readFileSync(cnamePath, 'utf8').trim() : '';
if (domain) {
  const set = run('gh', ['api', '-X', 'PUT', pagesApi, '-f', `cname=${domain}`, '-f', 'build_type=workflow'], {
    allowFail: true,
  });
  console.log(set === null ? `  Não foi possível definir o domínio ${domain} (verifique o DNS e as configurações do Pages).` : `  Domínio personalizado: ${domain}`);
}

// Dispara o workflow caso o push não o tenha disparado (ex.: Pages ativado depois do push).
run('gh', ['workflow', 'run', 'deploy.yml', '--repo', fullName, '--ref', BRANCH], { allowFail: true });

const pagesUrl = run('gh', ['api', pagesApi, '--jq', '.html_url'], { allowFail: true });
console.log('\n✔ Pronto! O deploy está rodando no GitHub Actions.');
console.log(`  Acompanhe: https://github.com/${fullName}/actions`);
console.log(`  Site:      ${pagesUrl || `https://${activeUser}.github.io/${REPO_NAME}/`}`);
console.log('  (leva cerca de 1–2 minutos para ficar no ar)');
