import express, { Request, Response } from "express";
import { Product } from "./product.model";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const products = await Product.find();
  res.json({
    success: true,
    message: "Products retrived successfully",
    data: products,
  });
});

router.post("/add-product", async (req: Request, res: Response) => {
  const result = await Product.create(req.body);
  res.json({
    success: true,
    message: "Your product added successfully",
    data: result,
  });
});

router.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const singleProduct = await Product.findById(id);
  res.json({
    success: true,
    message: "Product retrived successfully",
    data: singleProduct,
  });
});
router.put("/update-product/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const product = req.body;
  const options = { new: true, upsert: true };
  const updatedDoc = {
    $set: {
      ...product,
    },
  };
  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    updatedDoc,
    options
  );
  res.json({
    success: true,
    message: "Product updated successfully",
    data: updatedProduct,
  });
});

router.delete("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const singleProduct = await Product.deleteOne({ _id: id });
  res.json({
    success: true,
    message: "Product deleted successfully",
    data: singleProduct,
  });
});

export const ProductRoutes = router;
