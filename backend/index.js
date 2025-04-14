import cors from "cors";
import express from "express";
import dotenv from "dotenv";

import routes from "./routes/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use("/api-v1", routes);

// ✅ Universal 404 handler (no "*"!)
app.use((req, res) => {
  res.status(404).json({
    status: "404 Not Found",
    message: "Route not found",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
