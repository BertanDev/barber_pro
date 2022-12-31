# 💈 BarberPRO
 Sistema criado para controle de agendamentos a fim de ser usado em barbearias!
 
 Feito em aula junto ao @SujeitoProgramador
 
 ## Visão geral do projeto
 
 Ambas as stacks da aplicação foram criadas com a linguagem JavaScript, e o superset TypeScript.
 
 > A ideia central do sistema é, que na chegada do cliente ao estabelecimento, o recepcionista do local crie um agendamento com o nome do cliente,
 e o procedimento que irá realizar, e finalize o serviço no app assim que o serviço estiver finalizado e pago.
 
 > Usúarios que utilizarem o sistema com o plano Premium terão funcionalidades a mais.
 
 > Toda a seção de pagamento para aquisição do plano Premium, e cancelamento do plano, estão configuradas e funcionais utilizando a plataforma de pagamentos [Stripe](https://stripe.com/br)
 
 ### Funcionalidades gerais da aplicação
 
 - Geral
   - [x] Realizar seu cadastro
   - [x] Realizar seu login
   - [x] Editar seu perfil
   - [x] Criar novo agendamento
   - [x] Finalizar agendamento
  
 - Premium
   - [x] Registrar modelos de corte ilimitados
   - [x] Editar seus modelos de corte
   
 - Free
   - [x] Registrar apenas 3 modelos de corte
   
  ### Api
  O servidor foi criado utilizando NodeJS aliado ao framework Express.

  [Ver documentação completa da api](./server)

  ### Web
  A aplicação web foi criada utilizando React JS aliado ao framework NextJS.

  [Ver documentação completa da aplicação web](./web)
