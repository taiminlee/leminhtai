import { Request, Response } from "express";
import { openConnection } from "../../db";

// export interface ResponseResult<T> {
//     statusCode: number;
//     message?: string;
//     data?: T
// }

export interface Book {
  id: number;
  title: string;
  language: string;
  author_name: string;
  publish_name: string;
  page: number;
  year: number;
}

export type BookQuery = Omit<Book, "id" | "page">;

export type BookCreate = Omit<Book, "id">;

export async function readById(id: number): Promise<Book> {
  const db = openConnection();
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT id, title, language, author_name, publish_name, page, year FROM book WHERE id = ?`,
      id,
      (err, row: Book) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(row);
        }
      }
    );
  });
}

export async function readAll(): Promise<Book[]> {
  const db = openConnection();

  // db injection
  return new Promise<Book[]>((resolve, reject) => {
    db.all(
      "SELECT id, title, language, author_name, publish_name, page, year FROM book",
      (err, rows: Book[]) => {
        if (err) {
          reject(err.message);
        } else {
          resolve(rows);
        }
      }
    );
  });
}

export async function readByQueries(query: BookQuery): Promise<Book[]> {
  const db = openConnection();
  let sqlQuery =
    "SELECT id, title, language, author_name, publish_name, page, year FROM book WHERE 1=1";
  const params: (string | number)[] = [];
  Object.keys(query).forEach((key) => {
    const value = query[key as keyof BookQuery];
    if (value) {
      // FIXME: I will use a wildcard matches for this case!
      sqlQuery += ` AND ${key} like ?`;
      params.push(`%${value}%`);
    }
  });
  return new Promise<Book[]>((resolve, reject) => {
    db.all(sqlQuery, params, (err, rows: Book[]) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(rows);
      }
    });
  });
}

export async function create(book: BookCreate): Promise<Book> {
  const db = openConnection();

  return new Promise((resolve, reject) => {
    db.run(
      "INSERT INTO book (title, language, author_name, publish_name, page, year) VALUES (?, ?, ?, ?, ?, ?)",
      [
        book.title,
        book.language,
        book.author_name,
        book.publish_name,
        book.page,
        book.year,
      ],
      function (err) {
        if (err) {
          reject(err.message);
        } else {
          resolve({
            id: this.lastID,
            ...book,
          });
        }
      }
    );
  });
}

export async function update(id: number, book: Partial<Book>): Promise<void> {
  const db = openConnection();
  let sqlQuery = "UPDATE book SET";
  const params: any[] = [];
  const set: string[] = [];
  Object.keys(book).forEach((key) => {
    const value = book[key as keyof BookQuery];
    if (value) {
      set.push(` ${key} = ?`);
      params.push(value);
    }
  });
  sqlQuery += set.join(",");
  sqlQuery += ` WHERE id = ?`;
  params.push(id);
  return new Promise((resolve, reject) => {
    db.run(sqlQuery, params, (err) => {
      if (err) {
        reject(err.message);
      } else {
        resolve();
      }
    });
  });
}

export async function deleteById(id: number): Promise<number> {
  const db = openConnection();
  return new Promise((resolve, reject) => {
    db.run("DELETE FROM book WHERE id = ?", id, (err) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(id);
      }
    });
  });
}
