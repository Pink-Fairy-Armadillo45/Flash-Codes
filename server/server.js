const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const cookieParser = require('cookie-parser');
const fetch = require('node-fetch');


app.listen(PORT, () => console.log('Listening on port:', PORT));
