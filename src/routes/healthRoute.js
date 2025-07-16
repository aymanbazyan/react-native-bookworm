import express from "express";
import mongoose from "mongoose";
const router = express.Router();

router.get("/api/health", async (_req, res) => {
  try {
    // Fast ping that never touches any collection
    await mongoose.connection.db.admin().ping(); // < 2 ms on warm cluster

    return res.status(200).json({ status: "ok" });
  } catch (err) {
    console.error("DB ping failed:", err);
    return res.status(503).json({ status: "db-down" });
  }
});

export default router;
