/// <reference types="node" />

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const app = express();
app.use(cors());
app.use(express.json());

const AUTH_SECRET = process.env.AUTH_SECRET || 'default_secret';

// Middleware to verify JWT token
function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];
  jwt.verify(token, AUTH_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    (req as any).user = decoded;
    next();
  });
}

// Example protected route
app.get('/api/protected', verifyToken, (req: Request, res: Response) => {
  res.json({ message: 'Access granted', user: (req as any).user });
});

// Login route
app.post('/api/auth/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  // Dummy user check (replace with your logic)
  const isValidUser = username === 'admin' && password === 'admin123';
  if (!isValidUser) return res.status(401).json({ error: 'Invalid credentials' });

  const token = jwt.sign({ username, role: 'admin' }, AUTH_SECRET, { expiresIn: '2h' });
  res.json({ token });
});

// Health check
app.get('/api/ping', (req: Request, res: Response) => {
  res.send('pong');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
