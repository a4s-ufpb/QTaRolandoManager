
# QTáRolandoManager

Sistema Web desenvolvido em Angular para se integrar com o [QTáRolando-API](https://github.com/a4s-ufpb/QTaRolandoManager).


## 🛠 Tecnologias utilizadas

**Front-end:** Angular 14

**Back-end:** Spring Boot (QTáRolando-API)


## 💻 Rodando localmente

Clone o projeto

```bash
git clone https://github.com/a4s-ufpb/QTaRolandoManager.git
```

Entre no diretório do projeto

```bash
cd QTáRolandoManager
```

Instale as dependências

```bash
npm install
```

Configure o acesso ao back-end, colocando sua url na variável de ambiente `API` dentro do arquivo `environment.ts` localizado em `./src/environments/environment.ts`

```ts
export const environment = {
  production: false,
  API: 'http://localhost:8080/api'
};
```

Inicie o sistema

```bash
npm run start
```

Acesse o sistema utilizando a url http://localhost:4200/eventos
## ✅ Funcionalidades

- Cadastro de usuários
- Login de usuários Administradores
- Cadastro, atualização e remoção de Eventos
- Busca de eventos com filtros


## 🚀 Roadmap

- Melhorar a resposta em casos de erro

- Adicionar mais validações para evitar erros

- Adicionar mais integrações com a API

- Implementar as funções referentes ao gerenciamento de usuários

- Implementação de testes
