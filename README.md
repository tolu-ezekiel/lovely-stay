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


## Installation

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
NODE_ENV=development
```

### Run the application

Clone the repository.

Install dependencies: `npm install`.

Create a `.env` file with your credentials (sample values above).

Start the Docker container, install the dependencies and start the server.
```sh
npm run docker:build:up
```

### API Specification / documentation
Visit http://localhost:3000/api-docs for Swagger API documentation

### Health check
Visit http://localhost:3000/health-check


## Usage and Commands

Connect to the Docker container shell using the container name.
```sh
docker exec -it lovely-stay-app-1 sh
```
You can confirm your container name by running `docker ps` and replace 'lovely-stay-app-1' with your container name.


### `help`
**Description:** Display help content
```sh
npx ts-node src/yargs.ts --help 
```

### `fetch`
**Description:** Fetch and save user details from GitHub.

**Options:**

| Option       | Alias | Type   | Description                       | Required |
|--------------|-------|--------|-----------------------------------|----------|
| `--username` | `-u`  | string | GitHub username to fetch data for | true     |

```sh
npx ts-node src/yargs.ts fetch --username <username>
```
**Example Usage:**
`npx ts-node src/yargs.ts fetch --username tolu-ezekiel`


### `list`
**Description:** List users by location and/or programming languages

**Options:**

| Option        | Alias | Type   | Description                                       | Required |
|-------------- |-------|--------|--------------------------------------------------|----------|
| `--location`  | `-l`  | string | User location                                    | false    |
| `--languages` | `-p`  | array  | multiple strings to represent array of languages | false    |

```sh
npx ts-node src/yargs.ts list --location <location> --languages <language1> <language2> <language3>...
```
**Example Usage:**
`npx ts-node src/yargs.ts list --location Berlin --languages javascript Typescript`


### `Exist`
**Description:** Exit the app terminal
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
