import Generation from '../models/Generation.js';
import { generateCoverLetterContent, generateResumeContent } from '../services/openaiService.js';

export async function generateResume(req, res) {
  try {
    const resume = await generateResumeContent(req.body);
    await Generation.create({
      userId: req.body.userId || 'anonymous',
      type: 'resume',
      input: req.body,
      output: resume
    });
    res.json({ resume });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function generateCoverLetter(req, res) {
  try {
    const coverLetter = await generateCoverLetterContent(req.body);
    await Generation.create({
      userId: req.body.userId || 'anonymous',
      type: 'cover-letter',
      input: req.body,
      output: coverLetter
    });
    res.json({ coverLetter });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
