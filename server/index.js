import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import cors from "cors";

app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const corsOptions = {
	origin: "http://localhost:3000",
	credentials: true,
	optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// connectig to db
import connectToMongo from "./database/conn.js";
connectToMongo();

// importing all the routes
import loginRouter from "./routes/login.js";
import registerRouter from "./routes/register.js";
import homeRouter from "./routes/userHome.js";
import authenticate from "./middleware/auth.js";

app.get("/", authenticate, (req, res) => {
	res.status(200).send(req.rootUser);
});

// all routing
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/home", homeRouter);

app.listen(5000, () => {
	console.log("Server started at port 5000");
});
