import PembeliModel from "../models/PembeliModel.js";

const showPembeli = async (req, res, next) => {
  try {
    const data = req.data;
    res.status(200).json(data);
  } catch (e) {
    next(e);
  }
};

const findPembeli = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit ?? 20);
    const page = parseInt(req.query.page ?? 1);
    const offset = limit * page - limit;

    const nama = req.query.nama;
    const alamat = req.query.alamat;
    const kontak = req.query.kontak;

    let filter = {
      ...(nama && { nama: { $regex: nama, $options: "i" } }),
      ...(alamat && { alamat: { $regex: alamat, $options: "i" } }),
      ...(kontak && { kontak: { $regex: kontak, $options: "i" } }),
      ...(req.role !== "admin" && { createdBy: req.uid }),
    };

    const order = req.query.order === "desc" ? -1 : 1;
    const sortBy = req.query.sortBy ?? "_id";
    const sort = { [sortBy]: order };

    const all_data = await PembeliModel.countDocuments(filter);
    const data = await PembeliModel.find(filter)
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
  } catch (e) {
    next(e);
  }
};

const createPembeli = async (req, res, next) => {
  try {
    const { nama, alamat, kontak } = req.body;
    const data = {
      nama,
      alamat,
      kontak,
      createdBy: req.uid,
      updatedBy: req.uid,
    };

    const newData = new PembeliModel(data);
    const savedData = await newData.save();

    res.status(201).json(savedData);
  } catch (e) {
    next(e);
  }
};

const updatePembeli = async (req, res, next) => {
  try {
    const data = req.data;

    const { nama, alamat, kontak } = req.body;
    const newData = {
      nama,
      alamat,
      kontak,
      createdBy: req.uid,
      updatedBy: req.uid,
    };

    const updated = await PembeliModel.findByIdAndUpdate(data._id, newData, {
      new: true,
    });

    res.status(200).json(updated);
  } catch (e) {
    next(e);
  }
};

const deletePembeli = async (req, res, next) => {
  try {
    const data = req.data;
    const deleted = await PembeliModel.findByIdAndDelete(data._id);
    res.status(200).json(deleted);
  } catch (e) {
    next(e);
  }
};

export {
  showPembeli,
  findPembeli,
  createPembeli,
  updatePembeli,
  deletePembeli,
};
