import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { applyPosition, getApplicants, getAppliedPositions, updateStatus } from "../controllers/application.controller.js";
 
const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, applyPosition);
router.route("/get").get(isAuthenticated, getAppliedPositions);
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
router.route("/status/:id/update").post(isAuthenticated, updateStatus);
 

export default router;
