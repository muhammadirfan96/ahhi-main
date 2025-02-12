import { body, param, query } from "express-validator";
import PembeliModel from "../models/PembeliModel.js";
import runValidation from "../../../middlewares/runValidation.js";

const showPembeliValidation = [
  param("id")
    .isMongoId()
    .withMessage("invalid ID")
    .bail()
    .custom(async (value, { req }) => {
      try {
        let filter = { _id: value };
        if (req.role !== "admin") filter.createdBy = req.uid;
        const data = await PembeliModel.findOne(filter);
        if (!data) throw new Error("data not found");
        req.data = data;
      } catch (err) {
        throw new Error(err.message);
      }
      return true;
    })
    .bail({ level: "request" }),
  runValidation,
];

const findPembeliValidation = [
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("limit min: 1 and max: 100"),
  query("page").optional().isInt().withMessage("page must integer"),
  runValidation,
];

const createPembeliValidation = [
  body("nama")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("nama required")
    .bail()
    .isString()
    .withMessage("nama must string"),
  body("alamat")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("alamat required")
    .bail()
    .isString()
    .withMessage("alamat must string"),
  body("kontak")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("kontak required")
    .bail()
    .isString()
    .withMessage("kontak must string"),
  runValidation,
];

const updatePembeliValidation = [
  ...showPembeliValidation,
  ...createPembeliValidation,
];

const deletePembeliValidation = [...showPembeliValidation];

export {
  showPembeliValidation,
  findPembeliValidation,
  createPembeliValidation,
  updatePembeliValidation,
  deletePembeliValidation,
};
