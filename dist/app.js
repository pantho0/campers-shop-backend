"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const product_route_1 = require("./modules/products/product.route");
const app = (0, express_1.default)();
//parsers
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ["http://localhost:5173", "https://camp-set-go.vercel.app"],
    credentials: true,
}));
app.use("/api/v1/products", product_route_1.ProductRoutes);
app.get("/", (req, res) => {
    res.send("Camp Server is up");
});
exports.default = app;
