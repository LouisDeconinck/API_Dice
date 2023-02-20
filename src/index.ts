import { Hono } from "hono";
const app = new Hono();

app.get("/regular-die", (c) => {
	// Roll the die
	let result: number = Math.floor(Math.random() * 6) + 1
	return c.json({ result });
});

app.get("/custom-die", (c) => {
	// Variable declaration
	let sides: number;

	// Get query parameters
	if (c.req.query('sides')) {
		sides = c.req.query('sides') as unknown as number;
	} else {
		sides = 6;
	}

	// Limit the number of sides
	sides = Math.min(sides, 1000);

	// Roll the die
	let result: number = Math.floor(Math.random() * sides) + 1
	return c.json({ result });
});

app.get("/regular-dice", (c) => {
	// Variable declaration
	let dice: number;

	// Get query parameters
	if (c.req.query('dice')) {
		dice = c.req.query('dice') as unknown as number;
	} else {
		dice = 1;
	}

	// Limit the number of dice
	dice = Math.min(dice, 1000);

	// Roll the dice
	let result: Array<number> = [];
	for (let i = 0; i < dice; i++) {
		let roll: number = Math.floor(Math.random() * 6) + 1;
		result.push(roll);
	}

	let total: number = result.reduce((acc, cur) => acc + cur, 0);

	return c.json({ result, total });
});

app.get("/custom-dice", (c) => {
	// Variable declaration
	let dice: number;
	let sides: number;

	// Get query parameters
	if (c.req.query('dice')) {
		dice = c.req.query('dice') as unknown as number;
	} else {
		dice = 1;
	}
	if (c.req.query('sides')) {
		sides = c.req.query('sides') as unknown as number;
	} else {
		sides = 6;
	}

	// Limit the number of dice
	dice = Math.min(dice, 1000);
	sides = Math.min(sides, 1000);

	// Roll the dice
	let result: Array<number> = [];
	for (let i = 0; i < dice; i++) {
		let roll: number = Math.floor(Math.random() * sides) + 1;
		result.push(roll);
	}

	let total: number = result.reduce((acc, cur) => acc + cur, 0);

	return c.json({ result, total });
});

app.get("/regular-dice-rolls", (c) => {
	// Variable declaration
	let dice: number;
	let rolls: number;

	let totalResults: any = [];
	let totalSum: number = 0;

	// Get query parameters
	if (c.req.query('dice')) {
		dice = c.req.query('dice') as unknown as number;
	} else {
		dice = 1;
	}
	if (c.req.query('rolls')) {
		rolls = c.req.query('rolls') as unknown as number;
	} else {
		rolls = 1;
	}

	// Limit the number of dice, sides, and rolls
	dice = Math.min(dice, 1000);
	rolls = Math.min(rolls, 1000);

	// Roll the dice
	for (let i = 0; i < rolls; i++) {
		let rollResults: Array<number> = [];
		for (let j = 0; j < dice; j++) {
			let roll: number = Math.floor(Math.random() * 6) + 1;
			rollResults.push(roll);
		}

		let sum: number = rollResults.reduce((acc, cur) => acc + cur, 0);

		totalSum += sum;
		totalResults.push([rollResults, sum]);
	}
	totalResults.push(totalSum);

	// Format the results
	const result = totalResults.slice(0, -1).map(([roll, subtotal]: Array<Array<number> | number>) => ({ roll, subtotal }));
	const total = totalResults.slice(-1)[0];

	return c.json({ result, total });
});

app.get("/custom-dice-rolls", (c) => {
	// Variable declaration
	let dice: number;
	let sides: number;
	let rolls: number;

	let totalResults: any = [];
	let totalSum: number = 0;

	// Get query parameters
	if (c.req.query('dice')) {
		dice = c.req.query('dice') as unknown as number;
	} else {
		dice = 1;
	}
	if (c.req.query('sides')) {
		sides = c.req.query('sides') as unknown as number;
	} else {
		sides = 6;
	}
	if (c.req.query('rolls')) {
		rolls = c.req.query('rolls') as unknown as number;
	} else {
		rolls = 1;
	}

	// Limit the number of dice, sides, and rolls
	dice = Math.min(dice, 1000);
	sides = Math.min(sides, 1000);
	rolls = Math.min(rolls, 1000);

	// Roll the dice
	for (let i = 0; i < rolls; i++) {
		let rollResults: Array<number> = [];
		for (let j = 0; j < dice; j++) {
			let roll: number = Math.floor(Math.random() * sides) + 1;
			rollResults.push(roll);
		}

		let sum: number = rollResults.reduce((acc, cur) => acc + cur, 0);

		totalSum += sum;
		totalResults.push([rollResults, sum]);
	}
	totalResults.push(totalSum);

	// Format the results
	const result = totalResults.slice(0, -1).map(([roll, subtotal]: Array<Array<number> | number>) => ({ roll, subtotal }));
	const total = totalResults.slice(-1)[0];

	return c.json({ result, total });
});

export default app