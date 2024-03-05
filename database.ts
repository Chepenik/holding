// database.js
import { open } from 'sqlite'
import sqlite3 from 'sqlite3'

async function openDb() {
  return open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database,
  })
}

export async function setupDb() {
  const db = await openDb()
  await db.migrate({
    force: true,
    migrationsPath: './migrations',
  })
  return db
}
