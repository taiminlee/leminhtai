import express, { Express, Request, Response } from "express";
import bookRoutes from "./api/routes";

const app: Express = express();

const PORT = 3001;

app.use("/books", bookRoutes);

app.listen(PORT, () => {
  console.log(`[server] Server is running at http://localhost:${PORT}`);
});
