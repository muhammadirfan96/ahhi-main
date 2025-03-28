import { body, param, query } from "express-validator";
import BarangModel from "../models/BarangModel.js";
import runValidation from "../../../middlewares/runValidation.js";

const showBarangValidation = [
  param("id")
    .isMongoId()
    .withMessage("invalid ID")
    .bail()
    .custom(async (value, { req }) => {
      try {
        let filter = { _id: value };
        if (req.role !== "admin") filter.createdBy = req.uid;
        const data = await BarangModel.findOne(filter);
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

const findBarangValidation = [
  query("limit")
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage("limit min: 1 and max: 100"),
  query("page").optional().isInt().withMessage("page must integer"),
  runValidation,
];

const createBarangValidation = [
  body("kode")
    .trim()
    .notEmpty()
    .withMessage("kode required")
    .bail()
    .isString()
    .withMessage("kode must be a string")
    .isLength({ min: 3, max: 10 })
    .withMessage("kode must be between 3 and 10 characters")
    .custom(async (value) => {
      try {
        const existingBarang = await BarangModel.findOne({ kode: value });
        if (existingBarang) throw new Error("kode must be unique");
      } catch (err) {
        throw new Error(err.message);
      }
      return true;
    }),
  body("nama")
    .trim()
    .notEmpty()
    .withMessage("nama required")
    .bail()
    .isString()
    .withMessage("nama must be a string")
    .isLength({ min: 3, max: 50 })
    .withMessage("nama must be between 3 and 50 characters"),
  body("status")
    .trim()
    .notEmpty()
    .withMessage("status required")
    .bail()
    .isString()
    .withMessage("status must be a string")
    .isIn(["1", "0"])
    .withMessage("status must be 'ada' or 'tidak ada'"),
  body("harga_beli")
    .optional()
    .trim()
    .escape()
    .isFloat({ min: 0 })
    .withMessage("harga_beli must be a positive number"),
  body("harga_jual")
    .optional()
    .trim()
    .escape()
    .isFloat({ min: 0 })
    .withMessage("harga_jual must be a positive number"),
  body("diskon")
    .optional()
    .trim()
    .escape()
    .isFloat({ min: 0 })
    .withMessage("diskon must be a positive number"),
  body("photo")
    .optional()
    .trim()
    .escape()
    .isURL()
    .withMessage("photo must be a URL"),
  body("spesifikasi")
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage("spesifikasi must be a string"),
  body("catatan")
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage("catatan must be a string"),
  runValidation,
];

const updateBarangValidation = [
  ...showBarangValidation,
  ...createBarangValidation.filter((_, index) => index !== 0),
];
const deleteBarangValidation = [...showBarangValidation];
const uploadImageValidation = [...showBarangValidation];

export {
  showBarangValidation,
  findBarangValidation,
  // createBarangValidation,
  updateBarangValidation,
  deleteBarangValidation,
  uploadImageValidation,
};
