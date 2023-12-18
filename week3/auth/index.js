const express = require("express");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");

mongoose.connect(
	"mongodb+srv://omkar:hlkARym02L0AwKry@cluster0.3rjzbxr.mongodb.net/userApp"
);

const User = mongoose.model("Users", {
	name: String,
	email: String,
	password: String,
});

const jwtPassword = "123456";

const db = "";

const app = express();

app.use(express.json());

const ALL_USERS = [
	{
		username: "harkirat@gmail.com",
		password: "123",
		name: "harkirat singh",
	},
	{
		username: "raman@gmail.com",
		password: "123321",
		name: "Raman singh",
	},
	{
		username: "priya@gmail.com",
		password: "123321",
		name: "Priya kumari",
	},
];

function userExists(username, password) {
	// write logic to return true or false if this user exists
	// in ALL_USERS array

	const index = ALL_USERS.findIndex(
		(item) => item.username === username && item.password === password
	);
	if (index >= 0) return true;
	return false;
}

app.post("/signup", async function (req, res) {
	try {
		const email = req.body.email;
		const password = req.body.password;
		const name = req.body.name;

		if (!email || !password || !name) {
			return res.status(400).json({ error: "Bad request" });
		}

		const existingUser = await User.findOne({ email: email });

		if (existingUser) {
			return res.status(400).json({ error: "user already exists" });
		}

		const user = new User({
			email,
			password,
			name,
		});
		const savedUser = await user.save();

		return res.status(200).json({ user: savedUser });
	} catch (error) {
		return res.status(500).json({ error: error });
	}
});

app.post("/signin", function (req, res) {
	const username = req.body.username;
	const password = req.body.password;

	if (!userExists(username, password)) {
		return res.status(403).json({
			msg: "User doesnt exist in our in memory db",
		});
	}

	var token = jwt.sign({ username: username }, jwtPassword);
	return res.json({
		token,
	});
});

app.get("/users", function (req, res) {
	const token = req.headers.authorization;
	try {
		const decoded = jwt.verify(token, jwtPassword);
		const username = decoded.username;
		console.log(username);

		// return a list of users other than this username
		let data = ALL_USERS.filter((item) => item.username !== username);
		return res.status(200).json(data);
	} catch (err) {
		return res.status(401).json({
			msg: "Invalid token",
		});
	}
});

app.listen(3000);
