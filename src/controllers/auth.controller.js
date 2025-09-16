import jwt from "jsonwebtoken";
import User from "../models/User.js";

const sign = (u) => jwt.sign({ id: u._id, role: u.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (await User.findOne({ email })) return res.status(409).json({ ok: false, error: "Email ya registrado" });
    const user = await User.create({ name, email, password, role });
    res.status(201).json({ ok: true, data: { id: user._id, email }, token: sign(user) });
  } catch (e) {
    res.status(400).json({ ok: false, error: e.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const u = await User.findOne({ email });
  if (!u || !(await u.comparePassword(password))) return res.status(401).json({ ok: false, error: "Credenciales inválidas" });
  res.json({ ok: true, data: { id: u._id, email: u.email, role: u.role }, token: sign(u) });
};

export const me = async (req, res) => {
  const u = await User.findById(req.user.id).select("-password");
  res.json({ ok: true, data: u });
};

// === Endpoints extra para la pauta ===
export const verifyToken = async (req, res) => {
  res.json({ ok: true, data: { id: req.user.id, role: req.user.role } });
};

export const updateProfile = async (req, res) => {
  try {
    const allowed = ["name", "email", "password"];
    const updates = {};
    for (const k of allowed) if (req.body[k] !== undefined) updates[k] = req.body[k];

    if (Object.keys(updates).length === 0)
      return res.status(400).json({ ok: false, error: "Nada para actualizar" });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ ok: false, error: "Usuario no encontrado" });

    if (updates.email && updates.email !== user.email) {
      const taken = await User.findOne({ email: updates.email });
      if (taken) return res.status(409).json({ ok: false, error: "Email ya registrado" });
    }

    Object.assign(user, updates);
    await user.save(); // si cambia password, se re-hashea por el pre('save')

    const { password, ...clean } = user.toObject();
    res.json({ ok: true, data: clean });
  } catch (e) {
    res.status(400).json({ ok: false, error: e.message });
  }
};
