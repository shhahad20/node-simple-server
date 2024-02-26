import express from "express";
import "dotenv/config";

import productsRouter from "./routes/productsRoute.js";

const PORT = process.env.PORT || 8090;
const app = express();

// app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(productsRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
