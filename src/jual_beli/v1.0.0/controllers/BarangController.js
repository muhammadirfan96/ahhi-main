import BarangModel from "../models/BarangModel.js";
import CustomError from "../../../utils/CustomError.js";
import { unlinkSync, unlink, existsSync } from "fs";
import { upload } from "../../../middlewares/imageUpload.js";

const showBarang = async (req, res, next) => {
  try {
    res.status(200).json(req.data);
  } catch (err) {
    next(err);
  }
};

const findBarang = async (req, res, next) => {
  try {
    // Parsing query parameters
    const limit = parseInt(req.query.limit ?? 20);
    const page = parseInt(req.query.page ?? 1);
    const offset = limit * (page - 1);

    const kode = req.query.kode;
    const nama = req.query.nama;
    const spesifikasi = req.query.spesifikasi;
    const catatan = req.query.catatan;
    const harga_beli = req.query.harga_beli;
    const harga_jual = req.query.harga_jual;
    const diskon = req.query.diskon;
    const status = req.query.status;

    const filter = {
      ...(kode && { kode: { $regex: kode, $options: "i" } }),
      ...(nama && { nama: { $regex: nama, $options: "i" } }),
      ...(spesifikasi && {
        spesifikasi: { $regex: spesifikasi, $options: "i" },
      }),
      ...(catatan && { catatan: { $regex: catatan, $options: "i" } }),
      ...(harga_beli &&
        harga_beli.includes("-") && {
          harga_beli: {
            $gte: parseInt(harga_beli.split("-")[0]),
            $lte: parseInt(harga_beli.split("-")[1]),
          },
        }),
      ...(harga_jual &&
        harga_jual.includes("-") && {
          harga_jual: {
            $gte: parseInt(harga_jual.split("-")[0]),
            $lte: parseInt(harga_jual.split("-")[1]),
          },
        }),
      ...(diskon &&
        diskon.includes("-") && {
          diskon: {
            $gte: parseInt(diskon.split("-")[0]),
            $lte: parseInt(diskon.split("-")[1]),
          },
        }),
      ...(status && { status: { $regex: status, $options: "i" } }),
      ...(req.role !== "admin" && { createdBy: req.uid }),
    };

    const order = req.query.order === "desc" ? -1 : 1;
    const sortBy = req.query.sortBy ?? "_id";
    const sort = { [sortBy]: order };

    const all_data = await BarangModel.countDocuments(filter);
    const data = await BarangModel.find(filter)
      .sort(sort)
      .skip(offset)
      .limit(limit);

    const result = {
      all_data: all_data,
      all_page: Math.ceil(all_data / limit),
      crr_page: page,
      data: data,
    };

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

// const createBarang = async (req, res, next) => {
//   try {
//     const data = {
//       kode: req.body.kode,
//       nama: req.body.nama,
//       spesifikasi: req.body.spesifikasi,
//       catatan: req.body.catatan,
//       harga_beli: req.body.harga_beli,
//       harga_jual: req.body.harga_jual,
//       diskon: req.body.diskon,
//       status: req.body.status,
//       createdBy: req.uid || null,
//       updatedBy: req.uid || null,
//     };

//     const newBarang = new BarangModel(data);
//     const savedBarang = await newBarang.save();

//     res.status(201).json(savedBarang);
//   } catch (err) {
//     next(err);
//   }
// };

const updateBarang = async (req, res, next) => {
  try {
    const response = req.data;

    const data = {
      kode: req.body.kode,
      nama: req.body.nama,
      spesifikasi: req.body.spesifikasi,
      catatan: req.body.catatan,
      harga_beli: req.body.harga_beli,
      harga_jual: req.body.harga_jual,
      diskon: req.body.diskon,
      status: req.body.status,
      createdBy: req.uid || null,
      updatedBy: req.uid || null,
    };

    const updatedBarang = await BarangModel.findByIdAndUpdate(
      response.id,
      data,
      { new: true }
    );

    res.status(200).json(updatedBarang);
  } catch (err) {
    next(err);
  }
};

const deleteBarang = async (req, res, next) => {
  try {
    const response = req.data;

    const deletedBarang = await BarangModel.findByIdAndDelete(response.id);

    if (existsSync(response.photo)) unlinkSync(response.photo);

    res.status(200).json(deletedBarang);
  } catch (err) {
    next(err);
  }
};

const uploadImage = async (req, res, next) => {
  upload.single("photo")(req, res, (err) => {
    if (err) return next(new CustomError(400, err.message));

    const response = req.data;
    if (existsSync(response.photo))
      unlink(response.photo, (err) => {
        if (err) return next(new CustomError(500, err.message));
      });

    BarangModel.findByIdAndUpdate(
      req.data.id,
      {
        photo: req.file.path,
      },
      { new: true }
    )
      .then((result) => res.status(200).json(result))
      .catch((e) => next(e));
  });
};

export { showBarang, findBarang, updateBarang, deleteBarang, uploadImage };
