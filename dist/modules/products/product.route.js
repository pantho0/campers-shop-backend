"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
const express_1 = __importDefault(require("express"));
const product_model_1 = require("./product.model");
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { search, category, minPrice, maxPrice, sort } = req.query;
        let filter = {};
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
            if (minPrice)
                filter.price.$gte = Number(minPrice);
            if (maxPrice)
                filter.price.$lte = Number(maxPrice);
        }
        let sortOption = {};
        if (sort) {
            if (sort === "asc") {
                sortOption.price = 1; // Ascending
            }
            else if (sort === "desc") {
                sortOption.price = -1; // Descending
            }
        }
        const products = yield product_model_1.Product.find(filter).sort(sortOption);
        res.json({
            success: true,
            message: "Products retrieved successfully",
            data: products,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while retrieving products",
            error: error.message,
        });
    }
}));
router.post("/add-product", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_model_1.Product.create(req.body);
        res.json({
            success: true,
            message: "Your product added successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while adding product",
            error: error.message,
        });
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const singleProduct = yield product_model_1.Product.findById(id);
        res.json({
            success: true,
            message: "Product retrived successfully",
            data: singleProduct,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while retrieving product",
            error: error.message,
        });
    }
}));
router.put("/update-product/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const product = req.body;
        const options = { new: true, upsert: true };
        const updatedDoc = {
            $set: Object.assign({}, product),
        };
        const updatedProduct = yield product_model_1.Product.findByIdAndUpdate(id, updatedDoc, options);
        res.json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while updating product",
            error: error.message,
        });
    }
}));
router.patch("/increase-product/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const filter = yield product_model_1.Product.findById(id);
        const options = { new: true, upsert: true };
        const updatedDoc = {
            $set: {
                stockQuantity: filter.stockQuantity + 1,
            },
        };
        const updatedProduct = yield product_model_1.Product.findByIdAndUpdate(id, updatedDoc, options);
        res.json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while updating product",
            error: error.message,
        });
    }
}));
router.patch("/decrease-product/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const filter = yield product_model_1.Product.findById(id);
        const options = { new: true, upsert: true };
        const updatedDoc = {
            $set: {
                stockQuantity: filter.stockQuantity - 1,
            },
        };
        const updatedProduct = yield product_model_1.Product.findByIdAndUpdate(id, updatedDoc, options);
        res.json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while updating product",
            error: error.message,
        });
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const singleProduct = yield product_model_1.Product.deleteOne({ _id: id });
        res.json({
            success: true,
            message: "Product deleted successfully",
            data: singleProduct,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while deleting product",
            error: error.message,
        });
    }
}));
exports.ProductRoutes = router;
