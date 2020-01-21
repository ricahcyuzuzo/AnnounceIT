/* eslint-disable comma-dangle */
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import authRoutes from './v1/routes/auth.routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use('/api/v1', authRoutes);

app.get('/', (req, res) => {
  res.send({
    Message: 'Welcome on the Api',
  });
});

app.listen(port);

export default app;
