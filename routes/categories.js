import express from "express";
import {
  createCategory,
  getCategory,
  getsingleCategory,
} from "../controllers/Category.js";

const router = express.Router();

//CREATE
router.post("/", createCategory);

router.get("/", getCategory);
router.get("/find/:id", getsingleCategory);

export default router;
