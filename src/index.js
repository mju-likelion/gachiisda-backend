import express from 'express';
import api from './api/index.js';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
require('dotenv').config();

const app = express();
const port = process.env.PORT;

const { sequelize } = require('../models');
sequelize
  .sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.log(err);
  });

const corsOptions = {
  origin: '*',
  credentials: true,
};

app.use(morgan('tiny'));
app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get('/', (req, res) => {
  res.send('Hello');
});
app.use('/api', api);
app.use(function (req, res, next) {
  res.status(404).send('404 Not Found');
});

app.listen(port, () => {
  console.log(`서버실행 => http://localhost:${port}`);
});
