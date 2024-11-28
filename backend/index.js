const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes/index.js");
const morgan = require("morgan");
const cors = require("cors");
const {rateLimit} = require("express-rate-limit");
const start = require("./config/dbConnect.js");
const cookieParser = require("cookie-parser");

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
})

dotenv.config();
const PORT = process.env.PORT; 
const app = express();

start();

app.use(cookieParser());

//middlewaare for Cross-Origin Resource Sharing (CORS)
const corsOptions = {
    origin: "http://localhost:5173", // Allow requests from your frontend
    credentials: true, // Allow cookies and other credentials
};
app.use(cors(corsOptions))

//middleware for parsing JSON
app.use(express.json());

//middleware for logging HTTP requests to the console if the status code is 400 or above
app.use(
    morgan('dev', {
      skip: (req, res) => res.statusCode < 400,
    }),
);

//apply the rate limiter to all requests
app.use(limiter);
  
//use routes defined in the routes module
app.use("/api/v1", routes);

app.listen(PORT, ()=>console.log(`Server running in http://localhost:${PORT}`));