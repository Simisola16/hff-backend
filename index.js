process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
});

const express = require('express');
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require('dotenv');
const errorHandler = require('./Middlewares/errorHandler');
const newsRouter = require('./Routes/newsRouter');
const authRouter = require('./Routes/authRouter');
const facebookRouter = require('./Routes/facebookRouter');
const heroRouter = require('./Routes/heroRouter');
const formRouter = require('./Routes/formRouter');
const trusteeRouter = require('./Routes/trusteeRouter');
dotenv.config()

const connectToDb = require("./Config/connectToDb");
// require("./Services/Nodemailer/transporter");

// const newsRouter = require('./Routes/newsRouter');


const clientDomain = process.env.client_domain

app.use(cors({
    origin: "*"
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan("dev"))


// Database connection
connectToDb();

// Only listen to port in development
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 400;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

//Routes
app.get("/", (req, res)=>{res.send("Welcome to Halal Food Foundation Api version 1.0")})


app.use("/api/news", newsRouter);
app.use("/api/auth", authRouter);
app.use("/api/facebook", facebookRouter);
app.use("/api/hero", heroRouter);
app.use("/api/form", formRouter);
app.use("/api/trustee", trusteeRouter);

app.use(express.json())

app.use((req, res) => {
    res.status(404).json({
        message: `${req.method} ${req.originalUrl} is not an endpoint on this server.`
    });
});
// app.use((req, res, next) => {
//   res.set('Cache-Control', 'no-store');
//   next();
// });

app.use(errorHandler);

module.exports = app
