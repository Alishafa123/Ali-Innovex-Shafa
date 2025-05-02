const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;
const MONGOURL = "mongodb+srv://Ali:q0uZDrn2xZXVIoec@cluster0.xqpjzyt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error('MongoDB connection error:', err));
