import mongoose from 'mongoose';

const generationSchema = new mongoose.Schema(
  {
    userId: { type: String, default: 'anonymous' },
    type: { type: String, enum: ['resume', 'cover-letter'], required: true },
    input: { type: Object, required: true },
    output: { type: String, required: true }
  },
  { timestamps: true }
);

const Generation = mongoose.models.Generation || mongoose.model('Generation', generationSchema);

export default Generation;
