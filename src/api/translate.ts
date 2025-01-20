import type { NextApiRequest, NextApiResponse } from 'next';
import { translate } from '@vitalets/google-translate-api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { text, targetLanguage } = req.body;

    if (!text || !targetLanguage) {
      return res.status(400).json({ error: 'Missing text or targetLanguage' });
    }

    try {
      const { text: translatedText } = await translate(text, { to: targetLanguage });
      res.status(200).json({ translatedText });
    } catch (error) {
      console.error('Translation API error:', error);
      res.status(500).json({ error: 'Translation failed' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
