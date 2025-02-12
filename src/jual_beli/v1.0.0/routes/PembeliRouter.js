import express from "express";

import {
  showPembeli,
  findPembeli,
  createPembeli,
  updatePembeli,
  deletePembeli,
} from "../controllers/PembeliController.js";
import {
  showPembeliValidation,
  findPembeliValidation,
  createPembeliValidation,
  updatePembeliValidation,
  deletePembeliValidation,
} from "../validations/PembeliValidation.js";
import verifyToken from "../../../middlewares/verifyToken.js";

const PembeliRouter = express.Router();

PembeliRouter.get(
  "/pembeli/:id",
  verifyToken,
  showPembeliValidation,
  showPembeli
);

PembeliRouter.get("/pembelis", verifyToken, findPembeliValidation, findPembeli);

PembeliRouter.post(
  "/pembeli",
  verifyToken,
  createPembeliValidation,
  createPembeli
);

PembeliRouter.patch(
  "/pembeli/:id",
  verifyToken,
  updatePembeliValidation,
  updatePembeli
);

PembeliRouter.delete(
  "/pembeli/:id",
  verifyToken,
  deletePembeliValidation,
  deletePembeli
);

export default PembeliRouter;
