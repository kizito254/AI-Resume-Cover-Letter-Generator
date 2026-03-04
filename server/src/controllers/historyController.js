import Generation from '../models/Generation.js';

export async function getHistory(req, res) {
  try {
    const history = await Generation.find({ userId: req.params.userId }).sort({ createdAt: -1 }).limit(20);
    res.json({ history });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
