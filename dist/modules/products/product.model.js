"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    stockQuantity: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    ratings: { type: Number, required: true },
    images: { type: [Array], required: true }
});
exports.Product = (0, mongoose_1.model)("Product", productSchema);
