"use strict";
// /backend/src/server.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Esempio endpoint di test
app.get("/", (_req, res) => {
    res.send("✅ Backend API is running!");
});
// Se vuoi aggiungere gli altri endpoint:
// app.use("/api/...", require("./api/your-api-file").default);
app.listen(port, () => {
    console.log(`✅ Backend server is running on http://localhost:${port}`);
});
