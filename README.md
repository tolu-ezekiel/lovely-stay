# Lovelystay command-line application

This is a command-line application to fetch and display Github users and repositories.   

Docker and NodeJs is used to create the database and make sure the database is running while keeping the server container alive for shell commands.

## Tools:
- Typescript
- NodeJs
- PostgreSQL
- Yargs
- Prisma
- pg-promise
- Docker
- Eslint


## Installation and Usage

### Requirement
Docker and Node.Js

### Env variables
All values in the `.env` file can be changed to your prefered values.
```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=password
DB_HOST=postgres
DB_PORT=5432
POSTGRES_DB=lovely-dev
DATABASE_URL=postgresql://postgres:password@postgres:5432/lovely-dev
PORT=3000
LOG_LEVEL=info
```

### Run the application

Clone the repository.

Install dependencies: `npm install`.

Create a `.env` file with your credentials (sample values above).

Start the Docker container, install the dependencies and start the server.
```sh
npm run docker:build:up
```

Connect to the Docker container shell using the container name.
```sh
docker exec -it lovely-stay-app-1 sh
```
You can confirm your container name by running `docker ps` and replace 'lovely-stay-app-1' with your container name.


## Commands

-- Help 
```sh
npx ts-node src/yargs.ts --help 
```
-- Fetch and save a GitHub user
```sh
npx ts-node src/yargs.ts fetch --username <username>
```
example: `npx ts-node src/yargs.ts fetch --username tolu-ezekiel`

-- List users by location and/or programming languages
```sh
npx ts-node src/yargs.ts list --location <location> --languages <language1> <language2> <language3>...
```
example: `npx ts-node src/yargs.ts list --location Berlin --languages javascript Typescript`
Option `languages` accepts multiple strings to represent array of languages

-- Exit the app terminal
```sh
exit;
```


## Tests
To run the test suit run the commands below.

```sh
npm install
```

```sh
$ npm run test
```
