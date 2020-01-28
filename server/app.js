/* eslint-disable comma-dangle */
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import authRoutes from './v1/routes/auth.routes';
import advertiserRoutes from './v1/routes/advertiser.routes';
import adminRoutes from './v1/routes/admin.routes';
import authRoute from './v2/routes/auth.routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

app.use('/api/v1', authRoutes);
app.use('/api/v1', advertiserRoutes);
app.use('/api/v1', adminRoutes);
app.use('/api/v2', authRoute);

app.get('/', (req, res) => {
  res.send({
    Message: 'Welcome on the Api'
  });
});

app.listen(port, console.log(port));

export default app;
