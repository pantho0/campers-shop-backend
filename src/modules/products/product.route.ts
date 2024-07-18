/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import express, { Request, Response } from "express";
import { Product } from "./product.model";
import { TProduct } from "./product.interface";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const { search, category, minPrice, maxPrice, sort } = req.query;

    let filter: any = {};

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (category) {
      filter.category = category;
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    let sortOption: any = {};
    if (sort) {
      if (sort === "asc") {
        sortOption.price = 1; // Ascending
      } else if (sort === "desc") {
        sortOption.price = -1; // Descending
      }
    }

    const products = await Product.find(filter).sort(sortOption);

    res.json({
      success: true,
      message: "Products retrieved successfully",
      data: products,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving products",
      error: error.message,
    });
  }
});

router.post("/add-product", async (req: Request, res: Response) => {
  try {
    const result = await Product.create(req.body);
    res.json({
      success: true,
      message: "Your product added successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "An error occurred while adding product",
      error: error.message,
    });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const singleProduct = await Product.findById(id);
    res.json({
      success: true,
      message: "Product retrived successfully",
      data: singleProduct,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "An error occurred while retrieving product",
      error: error.message,
    });
  }
});
router.put("/update-product/:id", async (req: Request, res: Response) => {
  try {
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "An error occurred while updating product",
      error: error.message,
    });
  }
});

router.patch("/increase-product/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const filter = await Product.findById(id);
    const options = { new: true, upsert: true };
    const updatedDoc = {
      $set: {
        stockQuantity: filter!.stockQuantity + 1,
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "An error occurred while updating product",
      error: error.message,
    });
  }
});
router.patch("/decrease-product/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const filter = await Product.findById(id);
    const options = { new: true, upsert: true };
    const updatedDoc = {
      $set: {
        stockQuantity: filter!.stockQuantity - 1,
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
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "An error occurred while updating product",
      error: error.message,
    });
  }
});

router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const singleProduct = await Product.deleteOne({ _id: id });
    res.json({
      success: true,
      message: "Product deleted successfully",
      data: singleProduct,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting product",
      error: error.message,
    });
  }
});

export const ProductRoutes = router;
