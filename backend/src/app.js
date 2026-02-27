const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const defaultOrigins = ['http://localhost:3000', 'http://localhost:3001'];
const configuredOrigin = process.env.FRONTEND_URL;
const allowedOrigins = configuredOrigin
  ? Array.from(new Set([...defaultOrigins, configuredOrigin]))
  : defaultOrigins;

const isLocalDevOrigin = (origin) => {
  try {
    const url = new URL(origin);
    return url.protocol === 'http:' && ['localhost', '127.0.0.1'].includes(url.hostname);
  } catch {
    return false;
  }
};

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow non-browser requests (no origin) and explicitly allowed origins.
      if (!origin || allowedOrigins.includes(origin) || isLocalDevOrigin(origin)) {
        return callback(null, true);
      }
      return callback(null, false);
    },
    credentials: true
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('./config/database')();

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/public', require('./routes/publicRoutes'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong!',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

app.use((req, res) => {
  res.status(404).json({message: 'Route not found'});
});

module.exports = app;
