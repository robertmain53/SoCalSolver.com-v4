import { Router, Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

router.post('/improve', async (req: Request, res: Response) => {
  const { slug, content } = req.body;
  // TODO: Call your AI logic here
  res.json({ message: `AI improve called for ${slug}` });
});

router.post('/review', async (req: Request, res: Response) => {
  const { slug, diff } = req.body;
  // TODO: Call your AI review logic here
  res.json({ message: `AI review called for ${slug}` });
});

router.post('/publish', async (req: Request, res: Response) => {
  const { slug, content } = req.body;
  const filepath = path.resolve('content', `${slug}.md`);
  await fs.promises.writeFile(filepath, content);
  res.json({ message: 'Content published' });
});

export default router;
