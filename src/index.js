const express = require("express");
const https = require("https"); // Import https module
const http = require("http"); // Import http module
const fs = require("fs"); // Import file system module
const cors = require("cors");
const bodyParser = require("body-parser");


require("dotenv").config();

const port = process.env.PORT || 5000;
const router = require("./router/index");
const path = require("path");

// connect to db

require("./db/configDB");

const app = express();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

// Configure CORS for Express
app.use(cors({ origin: '*' }));

// Routes
app.use('/', router);

const server = process.env.NODE_ENV == 'production' ? (
            https.createServer({
                key : fs.readFileSync(path.join(__dirname, '../../../../conf/web/trang-dev.ictu.vn/ssl/trang-dev.ictu.vn.key')),
                cert: fs.readFileSync(path.join(__dirname, '../../../../conf/web/trang-dev.ictu.vn/ssl/trang-dev.ictu.vn.crt')),
                ca  : fs.readFileSync(path.join(__dirname, '../../../../conf/web/trang-dev.ictu.vn/ssl/trang-dev.ictu.vn.ca')),
            }, app)
        )
        :
        http.createServer(app)


server.listen(port, () => {
  console.log(`app running on ${process.env.NODE_ENV == 'production' ? 'https' : 'http'}://localhost:${port}`);
});