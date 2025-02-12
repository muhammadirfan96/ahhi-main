import { body, param, query } from "express-validator";
import PembeliModel from "../../models/PembeliModel.js";
import runValidation from "../../../../middlewares/runValidation.js";
import { showBarangValidation } from "../../validations/BarangValidation.js";

const ValidationPenjualanBarang = [
  ...showBarangValidation,
  body("tanggal_jual")
    .trim()
    .notEmpty()
    .withMessage("tanggal_jual required")
    .bail()
    .isISO8601()
    .withMessage("tanggal_jual must be a valid date format (YYYY-MM-DD)")
    .toDate(),
  body("pembeli_id")
    .isMongoId()
    .withMessage("invalid ID")
    .bail()
    .custom(async (value, { req }) => {
      try {
        let filter = { _id: value };
        if (req.role !== "admin") filter.createdBy = req.uid;
        const data = await PembeliModel.findOne(filter);
        if (!data) throw new Error("data not found");
      } catch (err) {
        throw new Error(err.message);
      }
      return true;
    })
    .bail({ level: "request" }),
  runValidation,
];

export default ValidationPenjualanBarang;
