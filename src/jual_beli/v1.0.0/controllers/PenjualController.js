import PenjualModel from "../models/PenjualModel.js";

const showPenjual = async (req, res, next) => {
  try {
    const data = req.data;
    res.status(200).json(data);
  } catch (e) {
    next(e);
  }
};

const findPenjual = async (req, res, next) => {
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

    const all_data = await PenjualModel.countDocuments(filter);
    const data = await PenjualModel.find(filter)
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

const createPenjual = async (req, res, next) => {
  try {
    const { nama, alamat, kontak } = req.body;
    const data = {
      nama,
      alamat,
      kontak,
      createdBy: req.uid,
      updatedBy: req.uid,
    };

    const newData = new PenjualModel(data);
    const savedData = await newData.save();

    res.status(201).json(savedData);
  } catch (e) {
    next(e);
  }
};

const updatePenjual = async (req, res, next) => {
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

    const updated = await PenjualModel.findByIdAndUpdate(data._id, newData, {
      new: true,
    });

    res.status(200).json(updated);
  } catch (e) {
    next(e);
  }
};

const deletePenjual = async (req, res, next) => {
  try {
    const data = req.data;
    const deleted = await PenjualModel.findByIdAndDelete(data._id);
    res.status(200).json(deleted);
  } catch (e) {
    next(e);
  }
};

export {
  showPenjual,
  findPenjual,
  createPenjual,
  updatePenjual,
  deletePenjual,
};
