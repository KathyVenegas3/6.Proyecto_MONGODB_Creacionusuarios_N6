import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  const doc = await Product.create({ ...req.body, owner: req.user.id });
  res.status(201).json({ ok: true, data: doc });
};

export const listProducts = async (req, res) => {
  const { status, q } = req.query;
  const filter = {};
  if (req.user.role !== "admin") filter.owner = req.user.id;
  if (status) filter.status = status;
  if (q) filter.title = { $regex: q, $options: "i" };
  const items = await Product.find(filter).sort({ createdAt: -1 });
  res.json({ ok: true, data: items });
};

export const getProduct = async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ ok: false, error: "No encontrado" });
  if (req.user.role !== "admin" && String(p.owner) !== req.user.id)
    return res.status(403).json({ ok: false, error: "Sin permisos" });
  res.json({ ok: true, data: p });
};

export const updateProduct = async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ ok: false, error: "No encontrado" });
  if (req.user.role !== "admin" && String(p.owner) !== req.user.id)
    return res.status(403).json({ ok: false, error: "Sin permisos" });
  Object.assign(p, req.body);
  await p.save();
  res.json({ ok: true, data: p });
};

export const deleteProduct = async (req, res) => {
  const p = await Product.findById(req.params.id);
  if (!p) return res.status(404).json({ ok: false, error: "No encontrado" });
  if (req.user.role !== "admin" && String(p.owner) !== req.user.id)
    return res.status(403).json({ ok: false, error: "Sin permisos" });
  await p.deleteOne();
  res.json({ ok: true, data: p._id });
};
