"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const router = (0, express_1.Router)();
router.post('/improve', async (req, res) => {
    const { slug, content } = req.body;
    // TODO: Call your AI logic here
    res.json({ message: `AI improve called for ${slug}` });
});
router.post('/review', async (req, res) => {
    const { slug, diff } = req.body;
    // TODO: Call your AI review logic here
    res.json({ message: `AI review called for ${slug}` });
});
router.post('/publish', async (req, res) => {
    const { slug, content } = req.body;
    const filepath = path_1.default.resolve('content', `${slug}.md`);
    await fs_1.default.promises.writeFile(filepath, content);
    res.json({ message: 'Content published' });
});
exports.default = router;
