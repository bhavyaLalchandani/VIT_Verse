import express from "express";
import isAuthenticated from "../middleware/isAuthenticated.js";
import {
  registerClub,
  getClub,
  getClubById,
  updateClub,
} from "../controllers/club.controller.js";
import { singleUpload } from "../middleware/multer.js";
const router = express.Router();

router.route("/register").post(isAuthenticated, registerClub);
router.route("/get").get(isAuthenticated, getClub);
router.route("/get/:id").get(isAuthenticated, getClubById);
router.route("/update/:id").put(isAuthenticated, singleUpload, updateClub);

export default router;
