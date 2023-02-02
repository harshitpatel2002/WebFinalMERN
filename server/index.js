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

if (
	process.env.NODE_ENV === "production" ||
	process.env.NODE_ENV === "staging"
) {
	app.use(express.static("client/build"));
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname + "/client/build/index.html"));
	});
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server started at port ${PORT}`);
});
