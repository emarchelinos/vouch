import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';
import { io } from './src/sockets';
import { router } from './src/routes/routes';
import { connectToDb } from './src/db';

connectToDb()

express()
   .use(json())
   .use(cors())
   .use(router)
   .listen(4000, () => {
    console.log('Express server is listening on port 4000');
  })

io.listen(4001);
console.log('Socket server is listening on port 4001')
