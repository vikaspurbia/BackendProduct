import express from 'express';
import sequelize from '../src/config/db';
import routes from './routes/auth.route';
import productRoutes from './routes/product.route';
import cors from 'cors';


const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());
app.use('/api', routes);
app.use('/api', productRoutes);


const startServer = async () => {
    try {
        await sequelize.sync();
        app.listen(5000, () => console.log('Server is running on port 5000'));
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

startServer();
