const print = (level) => {
	const content = Array(level).fill("* ").join("");
	Array(level)
		.fill("*")
		.map((item) => {
			console.log(content);
		});
};

print(8);
