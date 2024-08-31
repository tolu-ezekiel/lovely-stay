// import pgPromise from 'pg-promise';
import 'dotenv/config'
const pgp = require('pg-promise')({
  capSQL: true,
});

// dotenv.config();

// const pgp = pgPromise();

const db = pgp(process.env.DATABASE_URL!);

export {
  db,
  pgp,
};
