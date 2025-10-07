import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();

import authRoutes from './routes/auth';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Wide open for testing - restrict later
// app.use(cors({
//     origin: [process.env.FRONTEND_URL || 'http://localhost:3000', 'null'],
//     credentials: true,
// }));
//app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);

// Health check
app.get('/api/health', (req,res) => {
    res.status(200).json({status: 'OK', message: 'Server is running'});
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: '[backend/src/server.ts] Internal Server Error' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/api/health`);

});

// Handle uncaught errors
process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
    process.exit(1);
});