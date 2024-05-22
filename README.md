## API - NodeJs | Prisma | Solid | Docker | Typescript | Vitest | JWT | Eslint 

## RFs (Requisitos funcionas)

- [X] Deve ser possível se cadastrar;
- [X] Deve ser possível se autenticar;
- [X] Deve ser possível obter o perfil de um usuário logado;
- [X] Deve ser possível obter o número de check-ins realizados pelo usuário;
- [X] Deve ser possível o usuário obter seu histórico de check-ins;
- [X] Deve ser possível o usuário buscar academias próximas;
- [X] Deve ser possível o usuário buscar academias pelo nome;
- [X] Deve ser possível o usuário realizar check-in em uma academia;
- [X] Deve ser possível validar o check-in de um usuário;
- [X] Deve ser possível cadastrar uma academia

## RNs (Regras de negócio)

- [X] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [X] O usuário não pode fazer 2 check-in no mesmo dia;
- [X] O usuário não fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado até 20 minutos após criado;
- [ ] O check-in só pode ser validado por administradores;
- [ ] A academia só pode ser cadastrado por administradores;

## RNFs (Requisitos não-funcionas) - (Técnico)

- [X] A senha do usuário precisar estar criptografada;
- [X] Os dados da aplicação precisam estar persistidos em um Banco de dados PostgreSQL;
- [X] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [ ] O usuário deve ser identificado por um JWT(JSON Web Token)
