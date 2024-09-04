import 'dotenv/config';
import * as PGP from 'pg-promise';

const pgp = PGP({
  capSQL: true,
});

const db = pgp(process.env.DATABASE_URL!);

export { db, pgp };
