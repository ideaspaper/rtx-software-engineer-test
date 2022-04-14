import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import router from './routes/index.js';

const app = express();

app.use(morgan('tiny'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);

export default app;
