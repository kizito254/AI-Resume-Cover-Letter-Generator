import OpenAI from 'openai';

const client = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';

const fallbackResume = (payload) => `# ${payload.name || 'Candidate'}\n\n## Summary\nResults-driven professional targeting ${payload.jobTitle || 'the role'}.\n\n## Skills\n${payload.skills || 'Communication, Collaboration, Problem Solving'}\n\n## Experience\n${payload.experience || 'Add your relevant professional experience here.'}\n\n## Education\n${payload.education || 'Add your education details here.'}\n\n## Tailoring Notes\nKeywords aligned to job description have been incorporated for ATS readability.`;

const fallbackCoverLetter = (payload) => `Dear Hiring Manager at ${payload.companyName || 'your company'},\n\nI am excited to apply for the ${payload.jobTitle || 'open position'}. My background in ${payload.skills || 'core professional skills'} and hands-on experience make me a strong fit for this role.\n\nIn my previous work, I have demonstrated an ability to deliver measurable outcomes, collaborate across teams, and adapt quickly to business needs. I am particularly interested in this opportunity because of the goals reflected in your job description.\n\nThank you for your time and consideration. I would welcome the opportunity to discuss how I can contribute to your team.\n\nSincerely,\n${payload.name || 'Candidate'}`;

export async function generateResumeContent(payload) {
  if (!client) return fallbackResume(payload);

  const prompt = `Create an ATS-friendly resume with clear sections (Summary, Skills, Experience, Education).\nCandidate Info: ${JSON.stringify(
    payload
  )}`;

  const response = await client.chat.completions.create({
    model,
    messages: [{ role: 'user', content: prompt }]
  });

  return response.choices[0]?.message?.content?.trim() || fallbackResume(payload);
}

export async function generateCoverLetterContent(payload) {
  if (!client) return fallbackCoverLetter(payload);

  const prompt = `Write a personalized 3-4 paragraph cover letter based on this data: ${JSON.stringify(
    payload
  )}`;

  const response = await client.chat.completions.create({
    model,
    messages: [{ role: 'user', content: prompt }]
  });

  return response.choices[0]?.message?.content?.trim() || fallbackCoverLetter(payload);
}
