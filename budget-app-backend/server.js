const app = require('./app');
const cors = require('cors');
app.use(cors());  // Allow all origins by default


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
