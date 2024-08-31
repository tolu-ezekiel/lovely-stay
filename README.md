

npx ts-node src/index.ts --help

# GitHub User Fetcher

## Setup

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Create a PostgreSQL database and update `.env` with your credentials.
4. Run migrations: `npm run migrate`.
5. Compile TypeScript: `npm run build`.

## Setup

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Create a PostgreSQL database and update `.env` with your credentials.
4. Run migrations:
   ```bash
   npx typeorm migration:run


## Commands

- Fetch and save a GitHub user: `node dist/cli.js --fetch <username>`
- List all users: `node dist/cli.js --list`
- List users by location: `node dist/cli.js --list-location <location>`
- List users by


Fetch and save a GitHub user: node dist/cli.js --fetch <username>
List all users: node dist/cli.js --list
List users by location: node dist/cli.js --list-location <location>
List users by location and language: node dist/cli.js --list-location-language <location> <language>




project-root/
│
├── src/
│   ├── db/
│   │   ├── migrations/
│   │   │   └── 001_create_users_and_languages_tables.sql
│   │   ├── index.ts
│   │   └── queries.ts
│   │
│   ├── services/
│   │   ├── githubService.ts
│   │   └── userService.ts
│   │
│   ├── utils/
│   │   ├── fetch.ts
│   │   └── types.ts
│   │
│   ├── index.ts
│   └── cli.ts
│
├── tests/
│   ├── db.test.ts
│   ├── githubService.test.ts
│   ├── userService.test.ts
│   └── cli.test.ts
│
├── .eslintrc.json
├── package.json
├── tsconfig.json
├── README.md
└── .env
