import 'zone.js/node';

import { APP_BASE_HREF } from '@angular/common';
import express from 'express';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import bootstrap from './main.server';


const app = express();
const PORT = process.env['PORT'] || 4001;


const distFolder = join(process.cwd(), 'dist/atv03/browser');
const indexHtml = existsSync(join(distFolder, 'index.original.html'))
  ? 'index.original.html'
  : 'index.html';


app.get('*.*', express.static(distFolder, {
  maxAge: '1y'
}));




app.get('*', (req, res) => {

  res.sendFile(join(distFolder, indexHtml));
});

app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
}); 