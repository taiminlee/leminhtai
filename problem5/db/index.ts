import path from "path";
import sqlite3, { Database } from "sqlite3";

sqlite3.verbose();

const dbFilePath = path.join(__dirname, "database.db");

let db: Database | undefined;

export function openConnection(): Database {
  if (db === undefined) {
    db = new sqlite3.Database(dbFilePath, (err) => {
      err
        ? console.log("[server] Error opening database:", err?.message)
        : console.log("[server] Open connection successful!");
    });
  } else {
    console.log("[server] Using the existing connection!")
  }
  return db;
}

export function closeConnection(): void {
  if (db !== undefined) {
    db.close((err) => {
      if (err) {
        console.log("[server] Fail to close connection sqlite3: ", err);
      } else {
        console.log("[server] Close connection.");
      }
    });
    db = undefined;
  }
}
