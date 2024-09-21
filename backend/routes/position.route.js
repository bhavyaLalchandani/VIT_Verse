import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { getAdminPositions, getAllPositions, getPositionById, postPosition } from "../controllers/position.controller.js";

const router = express.Router();

router.route("/post").post(isAuthenticated, postPosition);
router.route("/get").get(isAuthenticated, getAllPositions);
router.route("/getadminpositions").get(isAuthenticated, getAdminPositions);
router.route("/get/:id").get(isAuthenticated, getPositionById);

export default router;