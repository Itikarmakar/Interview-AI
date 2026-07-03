const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Middleware to parse JSON requests
app.use(express.json());
app.use(cookieParser());

const authRouter = require('./routes/auth.routes');
const interviewRouter = require('./routes/interview.routes');


// Use the auth routes for any requests to /api/auth
app.use('/api/auth', authRouter);
app.use('/api/interview', interviewRouter);

module.exports = app;