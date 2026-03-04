export function uploadResume(req, res) {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }

  return res.json({
    filename: req.file.filename,
    originalName: req.file.originalname,
    path: req.file.path
  });
}
