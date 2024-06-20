import path from 'path';
import express from 'express';
import compression from 'compression';
import { renderPage } from 'vike/server';
import { root } from './root.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();

const port = process.env.PORT || 8000;
const isProduction = process.env.NODE_ENV === 'production';

startServer();

async function startServer() {
  const app = express();

  connectDB();

  app.use(compression());
  app.use('/api/products', productRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/orders', orderRoutes);
  app.use('/api/upload', uploadRoutes);

  // Vite integration
  if (isProduction) {
    // In production, serve static assets from dist/client
    const sirv = (await import('sirv')).default;
    app.use(sirv(`${root}/dist/client`));
  } else {
    // In development, use Vite's development server middleware
    const vite = await import('vite');
    const viteDevMiddleware = (await vite.createServer({
      root,
      server: { middlewareMode: true }
    })).middlewares;
    app.use(viteDevMiddleware);
  }

  // Body parser middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Cookie parser middleware
  app.use(cookieParser());

  // Vike middleware as catch-all
  app.get('*', async(req, res, next) => {
    console.log(req);
    const pageContextInit = {
      urlOriginal: req.originalUrl,
    };
    const pageContext = await renderPage(pageContextInit);
    if (pageContext.errorWhileRendering) {
      // Handle rendering errors
    }
    const { httpResponse } = pageContext;
    if (!httpResponse) {
      return next();
    } else {
        const { body, statusCode, headers, earlyHints } = httpResponse;
        if (res.writeEarlyHints) res.writeEarlyHints({ link: earlyHints.map((e) => e.earlyHintLink) });
        headers.forEach(([name, value]) => res.setHeader(name, value));
        res.status(statusCode).send(body);
    }
  });

  // Route for PayPal client ID configuration
  app.get('/api/config/paypal', (req, res) => {
    res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
  });

  // Serve static files from the 'uploads' directory
  const __dirname = path.resolve();
  app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

  // Serve static files in production from 'client/build'
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client', 'build')));
    // Serve index.html for all other routes
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  } else {
    // Default route for API running message in development
    app.get('/', (req, res) => {
      res.send('API is running...');
    });
  }

  // Middleware for handling 404 errors
  app.use(notFound);

  // Error handler middleware
  app.use(errorHandler);

  // Start the server
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
