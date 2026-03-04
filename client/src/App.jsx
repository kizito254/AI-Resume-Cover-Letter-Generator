import { useState } from 'react';
import ResultPanel from './components/ResultPanel';
import { generateCoverLetter, generateResume, uploadResume } from './services/api';

const initialForm = {
  name: '',
  skills: '',
  experience: '',
  education: '',
  jobTitle: '',
  companyName: '',
  jobDescription: ''
};

export default function App() {
  const [form, setForm] = useState(initialForm);
  const [resumeText, setResumeText] = useState('');
  const [coverLetterText, setCoverLetterText] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');

  const onChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadStatus('Uploading resume...');
    try {
      const result = await uploadResume(file);
      setUploadStatus(`Uploaded: ${result.filename}`);
    } catch {
      setUploadStatus('Upload failed.');
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const [resumeRes, coverRes] = await Promise.all([
        generateResume(form),
        generateCoverLetter(form)
      ]);
      setResumeText(resumeRes.resume);
      setCoverLetterText(coverRes.coverLetter);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-6xl p-6">
      <h1 className="mb-2 text-3xl font-bold">AI Resume & Cover Letter Generator</h1>
      <p className="mb-6 text-slate-600">Generate tailored application materials in minutes.</p>

      <div className="mb-6 grid gap-3 rounded-lg bg-white p-4 shadow md:grid-cols-2">
        {[
          ['name', 'Full Name'],
          ['skills', 'Skills (comma-separated)'],
          ['experience', 'Experience'],
          ['education', 'Education'],
          ['jobTitle', 'Target Job Title'],
          ['companyName', 'Company Name']
        ].map(([name, label]) => (
          <input
            key={name}
            name={name}
            value={form[name]}
            onChange={onChange}
            placeholder={label}
            className="rounded border border-slate-300 p-2"
          />
        ))}

        <textarea
          name="jobDescription"
          value={form.jobDescription}
          onChange={onChange}
          rows={8}
          placeholder="Paste job description"
          className="rounded border border-slate-300 p-2 md:col-span-2"
        />

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium">Upload Existing Resume (optional)</label>
          <input type="file" accept=".pdf,.doc,.docx,.txt" onChange={handleUpload} />
          {uploadStatus && <p className="mt-1 text-sm text-slate-600">{uploadStatus}</p>}
        </div>

        <div className="flex gap-3 md:col-span-2">
          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading}
            className="rounded bg-slate-900 px-4 py-2 text-white disabled:opacity-60"
          >
            {loading ? 'Generating...' : 'Generate Resume + Cover Letter'}
          </button>
          <button
            type="button"
            onClick={() => window.print()}
            className="rounded border border-slate-400 px-4 py-2"
          >
            Download as PDF
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ResultPanel title="Generated Resume" content={resumeText} />
        <ResultPanel title="Generated Cover Letter" content={coverLetterText} />
      </div>
    </main>
  );
}
