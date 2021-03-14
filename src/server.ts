import 'reflect-metadata';

import express from 'express';
import router from './routes';
import uploadConfig from './config/upload';

import './database';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(router);

app.listen(3333, () => {
  console.log('🚀 Server Started: http://localhost:3333');
});
