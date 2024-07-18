import { NextFunction, Request, Response } from "express";
import {
  Book,
  BookCreate,
  create,
  deleteById,
  readAll,
  readById,
  readByQueries,
  update,
} from "./module";
import { toBook, toBookQuery } from "./helper";

export async function readBook(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Book | void> {
  try {
    const { bookId } = req.params;
    const book: Book = await readById(Number(bookId));
    if (!book) {
      res.status(404).json({
        statusCode: 404,
        message: `Not found any book by the given id: ${bookId}`,
      });
    } else {
      res.status(200).json({
        statusCode: 200,
        data: book,
      });
    }
  } catch (error) {
    return next(error);
  }
}

export async function readBooks(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Book | void> {
  try {
    const books: Book[] = await readAll();
    res.status(200).json({
      statusCode: 200,
      data: books,
    });
  } catch (error) {
    return next(error);
  }
}

export async function readBooksByQuery(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Book | void> {
  try {
    const books: Book[] = await readByQueries(toBookQuery(req.query));
    res.status(200).json({
      statusCode: 200,
      data: books,
    });
  } catch (error) {
    return next(error);
  }
}

export async function createBook(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Book | void> {
  try {
    const book: BookCreate = await create(toBook(req.body));
    res.status(201).json({
      statusCode: 201,
      data: book,
    });
  } catch (error) {
    return next(error);
  }
}

export async function updateBook(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Book | void> {
  try {
    const id = Number(req.params.bookId);
    const bookUpdate = toBook(req.body);
    await update(id, bookUpdate);
    const book = await readById(id);
    res.status(200).json({
      statusCode: 200,
      data: book,
    });
  } catch (error) {
    return next(error);
  }
}

export async function deleteBook(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Book | void> {
  try {
    const { bookId } = req.params;
    const id: number = await deleteById(Number(bookId));
    res.status(204).json({
      statusCode: 204,
      data: id,
    });
  } catch (error) {
    return next(error);
  }
}
