/* process.on("message", (message) => {
  const jsonResponse = getAleatorios(message);
  process.send(jsonResponse);
  process.exit();
});

function getAleatorios(message) {
  let c = 0;
  const numeros = {};

  while (c < Number(message)) {
    const randomNum = Math.round(Math.random() * 999) + 1;
    if (numeros[randomNum]) {
      numeros[randomNum] += 1;
    } else {
      numeros[randomNum] = 1;
    }
    c += 1;
  }
  console.log(numeros);
  return numeros;
} */

/* ----------------------------------------- */

process.on("message", (message) => {
	if (message === "Ready") {
		process.send("Ready");
	} else {
		let c = 0;
		const numeros = {};
		while (c < Number(message)) {
			const randomNum = Math.round(Math.random() * 999) + 1;
			if (numeros[randomNum]) {
				numeros[randomNum] += 1;
			} else {
				numeros[randomNum] = 1;
			}
			c += 1;
		}
		process.send(numeros);
		process.exit();
	}
});