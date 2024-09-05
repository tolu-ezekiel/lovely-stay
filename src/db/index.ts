import 'dotenv/config';
import PGP from 'pg-promise';

const pgp = PGP({
  capSQL: true,
});

const db = pgp(process.env.DATABASE_URL!);

export { db, pgp };
