import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';

const app = express();

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use(cors({
    origin: process.env.CLIENT_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());

// Routes
app.use('/api/menu-items', menuItemRouter);

// Global error handler middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
});

export default app;
