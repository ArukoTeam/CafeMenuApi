require('dotenv').config();
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import authRouter from './routes/auth.routes';
import businessInfoRouter from './routes/businessInfo.routes';
import categoryRouter from './routes/category.routes';
import commentRouter from './routes/comment.routes';
import menuItemRouter from './routes/menuItem.routes';
import userRouter from './routes/user.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use(cors({
    origin: process.env.CLIENT_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(helmet());
app.use(morgan('combined'));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/menu-items', menuItemRouter);
app.use('/api/business', businessInfoRouter);
app.use('/api/category', categoryRouter);
app.use('/api/comment', commentRouter);
app.use('/api/user', userRouter);

// Global error handler middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
});

export default app;
