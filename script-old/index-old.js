const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')
const logger = require('../middleware/logger');
const app = express();

const members = require('../members');

// init middleware
// app.use(logger);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// members API routes
app.use('/api/members', require('../routes/api/member'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));