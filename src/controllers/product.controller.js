import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const doc = await Product.create({ ...req.body, owner: req.user.id });
    res.status(201).json({ ok: true, data: doc });
  } catch (e) {
    res.status(400).json({ ok: false, error: e.message });
  }
};

export const listProducts = async (req, res) => {
  try {
    const { status, q } = req.query;
    const filter = {};
    if (req.user.role !== "admin") filter.owner = req.user.id;
    if (status) filter.status = status;
    if (q) filter.title = { $regex: q, $options: "i" };

    const items = await Product.find(filter).sort({ createdAt: -1 });
    res.json({ ok: true, data: items });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ ok: false, error: "No encontrado" });
    if (req.user.role !== "admin" && String(p.owner) !== req.user.id)
      return res.status(403).json({ ok: false, error: "Sin permisos" });
    res.json({ ok: true, data: p });
  } catch {
    res.status(400).json({ ok: false, error: "ID inválido" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ ok: false, error: "No encontrado" });
    if (req.user.role !== "admin" && String(p.owner) !== req.user.id)
      return res.status(403).json({ ok: false, error: "Sin permisos" });

    Object.assign(p, req.body);
    await p.save();
    res.json({ ok: true, data: p });
  } catch (e) {
    res.status(400).json({ ok: false, error: e.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ ok: false, error: "No encontrado" });
    if (req.user.role !== "admin" && String(p.owner) !== req.user.id)
      return res.status(403).json({ ok: false, error: "Sin permisos" });

    await p.deleteOne();
    res.json({ ok: true, data: p._id });
  } catch {
    res.status(400).json({ ok: false, error: "ID inválido" });
  }
};
