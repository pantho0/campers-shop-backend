import express, { Request, Response } from "express";
import cors from "cors";
import { ProductRoutes } from "./modules/products/product.route";
const app = express();

//parsers
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);

app.use("/api/v1/products", ProductRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Camp Server is up");
});

export default app;
