# Api BarberPRO

A Api do sistema foi criada utilizando NodeJS aliado ao TypeScript, para comunicar a aplicação web com o banco de dados e a plataforma de pagamento da Stripe.

> Sistema de login criado com segurança, e permanência de usuário logado com JWT

> 

## 🔱 Ferramentas utilizadas
  - NodeJS com TypeScript
  - Prisma ORM
  - Stripe
  - Jsonwebtoken
  - Bcryptjs

## Rotas

- Rotas de usuário
  - POST ```/users``` Cria novo usuário
  - POST ```/session``` Realiza login do usuário
  - GET ```/me``` Busca detalhes do usuário logado
  - GET ```/check``` Busca o plano do usuário logado
  - PUT ```/users``` Altera as informações do usuário
  
- Rotas de Modelos de corte
  - POST ```/haircut``` Cria novo modelo de corte
  - PUT ```/haircut``` Altera modelo de corte existente
  - GET ```/haircuts``` Retorna a lista de modelos de corte do usuário logado
  - GET ```/haircut/count``` Retorna a quantidade de modelos de corte que o usuário logado tem cadastrado
  - GET ```/haircut/detail``` Retorna os detalhes de um modelo de corte
  
- Rotas de agendamentos
  - GET ```/schedules``` Retorna os agendamentos da barbearia logada
  - POST ```/schedule``` Cria um novo agendamento na barbearia logada
  - DELETE ```/schedule``` Finaliza um agendamento

- Rotas de pagamento
  - POST ```/subscribe``` Adiciona plano Premium para o usuário
  - POST ```/webhooks``` Rota usada pelo stripe
  - POST ```/create-portal``` Direciona o usuário para o portal do Stripe para alterar seus dados ou cancelar assinatura
