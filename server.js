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
app.use('/doc-verify', require('./doc-verify'));
app.use('/login', require('./loginpage'));
app.use('/frontui-temple', require('./user-temple-frontUI'));
app.use('/events', require('./show-events-user'));
app.use('/dashboard-temple', require('./user-temple-frontUI'));











const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
