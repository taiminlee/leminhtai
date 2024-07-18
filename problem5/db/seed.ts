import { closeConnection, openConnection } from ".";
import dataset from "./data.json";
import * as readLine from "readline";

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "This script will be run the database seeding, the data will be lost if they already exist!\n\n" +
    "Do you wanna continue (yes/no): ",
  (answer) => {
    if (
      answer.toLocaleLowerCase() === "yes" ||
      answer.toLocaleLowerCase() === "y"
    ) {
      const db = openConnection();

      db.serialize(() => {
        console.log("[server] Seeding data from script is now running...");

        db.run(`DROP TABLE IF EXISTS book`);
        db.run(`CREATE TABLE book (
          id              INTEGER PRIMARY KEY AUTOINCREMENT,
          title           VARCHAR(100) NOT NULL,
          language        VARCHAR(50),
          author_name     VARCHAR(100),     
          publish_name    VARCHAR(100),
          page            INTEGER,
          year            INTEGER
          )`);

        const stmt = db.prepare(
          "INSERT INTO book (title, language, author_name, publish_name, page, year) VALUES (?, ?, ?, ?, ?, ?)"
        );

        dataset.forEach((book) => {
          stmt.run(
            book.title,
            book.language,
            book.author_name,
            book.publish_name,
            book.page,
            book.year
          );
        });

        stmt.finalize();
        console.log("[server] Seeding data from script is now complete!");
      });

      closeConnection();
    } else {
      console.log("[server] Operation canceled");
    }
    rl.close();
  }
);
