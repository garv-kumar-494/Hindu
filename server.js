const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');




const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log(err));


// Routes
app.use('/member', require('./memb-prof'));











const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
