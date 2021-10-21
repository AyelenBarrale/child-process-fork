import { fork } from "child_process";

const aleatorios = fork("./src/services/random.service.js");

/* export const renderRandom = async (req, res) => {
  const {
    query: { cant },
  } = req;

  const quantity = Number(cant) || 100000000;
  aleatorios.send(quantity);

  aleatorios.on("message", (message) => {
    console.log("resultado:", message);
    res.status(200).json({ message });
  });
  aleatorios.send("Ready");
}; */

/* ----------------------------------------- */

export const renderRandom = async (req, res) => {
  try {
    const {
      query: { cant },
    } = req;

    const quantity = Number(cant) || 100000000;

    aleatorios.on("message", (message) => {
      if (message === "Ready") {
        aleatorios.send(quantity);
      } else {
        res.json(message);
      }
    });
    aleatorios.send("Ready");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
