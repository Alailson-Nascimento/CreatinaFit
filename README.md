# 🏆 CreatinaFit

SaaS de gestão de academia desenvolvido como avaliação final da disciplina de Desenvolvimento Web (Firjan SENAI). O projeto simula uma aplicação oferecida por assinatura (modelo SaaS) para donos de academia gerenciarem alunos, turmas, planos e check-ins.

## 📋 Sobre o projeto

**Problema que resolve:** donos de academia/estúdio pequeno têm dificuldade de controlar matrículas, planos, turmas e frequência dos alunos manualmente.

**Tipos de usuário:**
- **Admin** — gerencia tudo: dashboard, alunos, turmas, planos, check-in
- **Instrutor** — acesso a turmas e check-in
- **Aluno** — acesso a check-in

## 🚀 Tecnologias

- Angular (standalone components) + TypeScript
- SCSS
- Vitest (testes)
- ESLint + Prettier
- Chart.js / ng2-charts (gráficos do dashboard)
- Faker.js (geração de dados fake)
- Persistência: localStorage
- Arquitetura: page / model / service

## ✅ Funcionalidades

- Autenticação simulada (login/logout) com 3 tipos de usuário
- Dashboard com indicadores e gráficos (alunos por plano, turmas por modalidade)
- Cadastro e listagem de alunos
- Listagem de turmas com vagas disponíveis
- Listagem de planos
- Check-in de alunos, com validação de regras de negócio
- Rotas protegidas por guard de autenticação
- Interface responsiva

## 📐 Regras de negócio (testadas com Vitest)

1. Aluno com plano vencido não pode fazer check-in
2. Turma não pode passar da capacidade máxima
3. Aluno não pode fazer check-in duas vezes na mesma aula
4. Instrutor não pode ter duas turmas no mesmo horário
5. Aluno não pode se matricular em duas turmas com o mesmo horário
6. Ao renovar o plano, a nova data de vencimento conta a partir de hoje
7. Cadastro de plano/turma não aceita valores inválidos

## 🔑 Credenciais de teste

| Tipo | Email | Senha |
|---|---|---|
| Admin | admin@creatinafit.com | 123456 |
| Instrutor | instrutor@creatinafit.com | 123456 |
| Aluno | aluno@creatinafit.com | 123456 |

## ⚠️ Sobre persistência e autenticação

Este projeto não possui backend — é focado em front-end, conforme escopo da disciplina. A persistência de dados é feita via **localStorage**, e a autenticação é simulada com usuários fixos no código (sem criptografia de senha ou token), suficiente para demonstrar o conceito de controle de acesso por tipo de usuário.

## 💻 Como rodar localmente

```bash
git clone https://github.com/Alailson-Nascimento/CreatinaFit.git
cd CreatinaFit
npm install
ng serve
```

Acesse `http://localhost:4200`

## 🧪 Rodando os testes

```bash
npm test
```

## 🔗 Links

- **Repositório:** https://github.com/Alailson-Nascimento/CreatinaFit
- **Deploy (Netlify):** https://creatinafit.netlify.app/login

## 👤 Autor

Alailson Nascimento 
