import tls from 'tls';
import express from 'express';
import { apiRouter } from './api.js';
import { appUrl, isDev } from './env.js';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import path from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
// Defeat cloudflare ssl fingerprinting!

tls.DEFAULT_CIPHERS =
  'TLS_GREASE_IS_THE_WORD_0A:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256:TLS_AES_128_GCM_SHA256';

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', isDev ? '*' : appUrl);
  next();
});

app.use('/api/', apiRouter);

if (!isDev) {
  app.use(express.static(path.join(__dirname, 'web/')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'web', 'index.html'))
  );
  // app.use(express.static(path.join(__dirname, 'web/')));
}

app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(4000, () => {
  console.log('Listening on port 4000');
});

export {};
