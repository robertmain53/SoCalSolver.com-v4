"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const h3_1 = require("h3");
exports.default = (0, h3_1.defineEventHandler)(async (event) => {
    const body = await (0, h3_1.readBody)(event);
    if (!body) {
        throw (0, h3_1.createError)({ statusCode: 400, statusMessage: 'No body provided' });
    }
    const { text, targetLang } = body;
    if (!text || !targetLang) {
        throw (0, h3_1.createError)({ statusCode: 400, statusMessage: 'Missing text or targetLang' });
    }
    return { translatedText: `Translated(${targetLang}): ${text}` };
});
