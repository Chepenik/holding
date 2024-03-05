import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';

sqlite3.verbose();

async function openDb(): Promise<Database> {
  return open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  });
}

export async function setupDb() {
  const db = await openDb();
  await db.migrate({
    force: 'last',
    migrationsPath: './migrations',
  });
  return db;
}
