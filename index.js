const express = require('express');
const cors = require('cors');
const path = require('path');
const exportRoute = require('./routes/export');

const app = express();
const PORT = 3000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.options('*', cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', exportRoute);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
