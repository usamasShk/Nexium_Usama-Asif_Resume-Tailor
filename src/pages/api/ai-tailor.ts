// src/pages/api/ai-tailor.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { sendToN8nWebhook } from '../../lib/n8nClient';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { resume, job } = req.body;

    if (!resume || !job) {
      return res.status(400).json({ error: 'Resume and job description are required' });
    }

    // Send to n8n webhook and get tailored response
    const response = await sendToN8nWebhook(resume, job);

    // Return the tailored resume
    return res.status(200).json(response);
  } catch (error) {
    console.error('Error in AI tailor:', error);
    return res.status(500).json({ error: 'Failed to process resume' });
  }
}
