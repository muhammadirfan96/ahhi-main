import express from "express";
import {
  showBarang,
  findBarang,
  updateBarang,
  deleteBarang,
  uploadImage,
} from "../controllers/BarangController.js";
import {
  showBarangValidation,
  findBarangValidation,
  updateBarangValidation,
  uploadImageValidation,
} from "../validations/BarangValidation.js";
import verifyToken from "../../../middlewares/verifyToken.js";
const BarangRouter = express.Router();

BarangRouter.get("/barangs", verifyToken, findBarangValidation, findBarang);
BarangRouter.get("/barang/:id", verifyToken, showBarangValidation, showBarang);
BarangRouter.patch(
  "/barang/:id",
  verifyToken,
  updateBarangValidation,
  updateBarang
);
BarangRouter.patch(
  "/barang/:id/photo",
  verifyToken,
  uploadImageValidation,
  uploadImage
);
BarangRouter.delete(
  "/barang/:id",
  verifyToken,
  showBarangValidation,
  deleteBarang
);
export default BarangRouter;
