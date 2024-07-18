import { NextFunction, Request, Response } from "express";
import { toBook, validBookId, validBookNumberField } from "./helper";
import { BookCreate, readById } from "./module";

export function validBookIdParams(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { bookId } = req.params;
  if (!validBookId(bookId)) {
    return res.status(400).json({
      statusCode: 400,
      message: "Book Id must be a number!",
    });
  }
  return next();
}

export async function validBookCreate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const book = toBook(req.body);

  try {
    if (!book.title) {
      return res.status(400).json({
        statusCode: 400,
        message: `Book title is not empty!`,
      });
    }
    if (!validBookNumberField(book.page)) {
      return res.status(400).json({
        statusCode: 400,
        message: `Book page must be number!`,
      });
    }
    if (!validBookNumberField(book.year)) {
      return res.status(400).json({
        statusCode: 400,
        message: `Book year must be number!`,
      });
    }

    return next();
  } catch (error) {
    throw Error((error as unknown as Error).message);
  }
}

export async function validBookUpdate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const book = toBook(req.body);
  const { bookId } = req.params;
  try {
    if (
      Object.keys(book).filter((key) => book[key as keyof BookCreate])
        .length === 0
    ) {
      return res.status(204).json();
    }
    const existBook = await readById(Number(bookId));
    if (!existBook) {
      return res.status(400).json({
        statusCode: 400,
        message: `This book with id: ${bookId} is not exist`,
      });
    }

    if (!validBookNumberField(book.page)) {
      return res.status(400).json({
        statusCode: 400,
        message: `Book page must be number!`,
      });
    }
    if (!validBookNumberField(book.year)) {
      return res.status(400).json({
        statusCode: 400,
        message: `Book year must be number!`,
      });
    }
    return next();
  } catch (error) {
    throw Error((error as unknown as Error).message);
  }
}
