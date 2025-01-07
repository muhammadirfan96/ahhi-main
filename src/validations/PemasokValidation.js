import { body, param, query } from 'express-validator';
import PemasokModel from '../models/PemasokModel.js';
import runValidation from '../middlewares/runValidation.js';

const showPemasokValidation = [
  param('id')
    .isMongoId()
    .withMessage('invalid ID')
    .bail()
    .custom(async (value, { req }) => {
      try {
        let filter;
        if (req.role === 'admin') {
          filter = { _id: value };
        } else if (req.role === 'user') {
          filter = { _id: value, createdBy: req.uid };
        } else {
          throw new Error('role not allowed');
        }

        const data = await PemasokModel.findOne(filter);

        if (!data) throw new Error('data not found');
        req.data = data;
      } catch (err) {
        throw new Error(err.message);
      }
      return true;
    })
    .bail({ level: 'request' }),
  runValidation
];

const findPemasokValidation = [
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('limit min: 1 and max: 100'),
  query('page').optional().isInt().withMessage('page must integer'),
  runValidation
];

const createPemasokValidation = [
  body('nama')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('nama required')
    .bail()
    .isString()
    .withMessage('nama must string'),
  body('alamat')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('alamat required')
    .bail()
    .isString()
    .withMessage('alamat must string'),
  body('kontak')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('kontak required')
    .bail()
    .isString()
    .withMessage('kontak must string'),
  runValidation
];

const updatePemasokValidation = [
  ...showPemasokValidation,
  ...createPemasokValidation
];

const deletePemasokValidation = [...showPemasokValidation];

export {
  showPemasokValidation,
  findPemasokValidation,
  createPemasokValidation,
  updatePemasokValidation,
  deletePemasokValidation
};
