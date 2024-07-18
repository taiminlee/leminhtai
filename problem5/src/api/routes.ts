import { json, Router } from "express";
import {
  createBook,
  deleteBook,
  readBook,
  readBooks,
  readBooksByQuery,
  updateBook,
} from "./controller";
import { errorHandler } from "./handler";
import {
  validBookCreate,
  validBookIdParams,
  validBookUpdate,
} from "./middleware";

const router = Router();
router.use(json());

router.get("/", readBooks);
router.get("/search", readBooksByQuery);
router.get("/:bookId", validBookIdParams, readBook);

router.post("/", validBookCreate, createBook);
router.put("/:bookId", validBookIdParams, validBookUpdate, updateBook);
router.delete("/:bookId", validBookIdParams, deleteBook);

errorHandler(router);
export default router;
