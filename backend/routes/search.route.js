import express from "express";
import { searchNetflix, getSearchHistory, deleteItemSearchHistory } from "../controllers/search.controller.js";
const router = express.Router();

router.delete("/history/:id", deleteItemSearchHistory);

router.get("/history", getSearchHistory );
router.get("/:type/:query", searchNetflix );
 
export default router;