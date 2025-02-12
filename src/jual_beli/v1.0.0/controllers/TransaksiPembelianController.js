import TransaksiPembelianModel from "../models/TransaksiPembelianModel.js";

const showTransaksiPembelian = async (req, res, next) => {
  try {
    const data = req.data;
    res.status(200).json(data);
  } catch (e) {
    next(e);
  }
};

const findTransaksiPembelian = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit ?? 20);
    const page = parseInt(req.query.page ?? 1);
    const offset = limit * page - limit;

    const tanggal_beli = req.query.tanggal_beli;
    const barang_id = req.query.barang_id;
    const penjual_id = req.query.penjual_id;

    let filter = {
      ...(tanggal_beli &&
        tanggal_beli.includes("@") && {
          tanggal_beli: {
            $gte: tanggal_beli.split("@")[0],
            $lte: tanggal_beli.split("@")[1],
          },
        }),
      ...(Array.isArray(barang_id) &&
        barang_id.length > 0 && {
          barang_id: { $in: barang_id },
        }),
      ...(Array.isArray(penjual_id) &&
        penjual_id.length > 0 && {
          penjual_id: { $in: penjual_id },
        }),
      ...(req.role !== "admin" && { createdBy: req.uid }),
    };

    const order = req.query.order === "desc" ? -1 : 1;
    const sortBy = req.query.sortBy ?? "_id";
    const sort = { [sortBy]: order };

    const all_data = await TransaksiPembelianModel.countDocuments(filter);
    const data = await TransaksiPembelianModel.find(filter)
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

export { showTransaksiPembelian, findTransaksiPembelian };
