const express = require("express");
const zod = require("zod");

const app = express();
app.use(express.json());

const healthChekupSchema = zod.object({ kidneys: zod.array(zod.number()) });

const userSchema = zod.object({
	email: zod.string().email(),
	password: zod.string().min(8),
	country: zod.literal("IN").or(zod.literal("US")),
	kidneys: zod.array(zod.number()),
});

app.post("/health-checkup", function (req, res) {
	console.log("BODY", req.body);
	const bodyResponse = healthChekupSchema.safeParse(req.body);
	return res.json(bodyResponse);
	const kidneys = req.body.kidneys;

	res.send(`You have ${kidneys.length} kidneys`);
});

// Global error handling / Global catches
// => If there is ever an exception, this middleware will get control
// It has 4 parameters in its callback
app.use(function (err, req, res, next) {
	console.log(err);
	res.json({
		msg: "Something went wrong",
	});
});

app.listen(3000);
