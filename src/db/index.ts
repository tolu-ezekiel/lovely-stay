// import pgPromise from 'pg-promise';
import 'dotenv/config';
import * as PGP from 'pg-promise';

const pgp = PGP({
  capSQL: true,
});

// dotenv.config();

// const pgp = pgPromise();

const db = pgp(process.env.DATABASE_URL!);

export { db, pgp };
