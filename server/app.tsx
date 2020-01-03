// abc
export {};

import express from 'express';
import next from 'next';
import userRouter from '../routes/userRouter';

const port = process.env.PORT || 8000;
const ROOT_URL = `http://localhost:${port}`;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.use('/user', UserRouter);

    server.get('/', (req, res) => {
      res.send('My express server');
    });

    server.get('*', (req, res) => handle(req, res));

    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on ${ROOT_URL}`);
    });
  })
  .catch(err => {
    console.error(err);
  });
