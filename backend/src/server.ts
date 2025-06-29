// /backend/src/server.ts

import express from "express";
import cors from "cors";
import path from "path";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Esempio endpoint di test
app.get("/", (_req, res) => {
  res.send("✅ Backend API is running!");
});

// Se vuoi aggiungere gli altri endpoint:
// app.use("/api/...", require("./api/your-api-file").default);

app.listen(port, () => {
  console.log(`✅ Backend server is running on http://localhost:${port}`);
});
