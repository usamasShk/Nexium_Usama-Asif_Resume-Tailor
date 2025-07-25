// src/pages/api/resume.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, resume } = req.body;
    try {
      const client = await clientPromise;
      const db = client.db();
      const result = await db.collection('resumes').insertOne({ userId, resume, createdAt: new Date() });
      res.status(201).json({ success: true, id: result.insertedId });
    } catch (error) {
      res.status(500).json({ success: false, error: (error as Error).message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
