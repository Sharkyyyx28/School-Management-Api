require('dotenv').config();
const express = require('express');
const { testConnection } = require('./config/db');
const schoolRoutes = require('./routes/school.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'School Management API is running 🎓',
    version: '1.0.0',
    endpoints: {
      addSchool: 'POST /addSchool',
      listSchools: 'GET /listSchools?latitude=<lat>&longitude=<lon>',
    },
  });
});

app.use('/', schoolRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
  });
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'An unexpected error occurred',
  });
});

const startServer = async () => {
  await testConnection();
  app.listen(PORT, () => {
    console.log(`\n🚀 Server running on http://localhost:${PORT}`);
    console.log(`📖 Health check: http://localhost:${PORT}/`);
    console.log(`📚 Add school:   POST http://localhost:${PORT}/addSchool`);
    console.log(`🗺️  List schools: GET  http://localhost:${PORT}/listSchools?latitude=<lat>&longitude=<lon>\n`);
  });
};

startServer();
