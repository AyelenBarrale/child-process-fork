import emoji from "node-emoji";
import "./db.js";
import { app } from "./app.js";
import minimist from "minimist";

const options = {
  default: {
    p: 8080,
  },
};

const arg = minimist(process.argv.slice(2), options);
console.log(arg);

const PORT = Number(arg.p);
const server = app.listen(PORT, () =>
  console.log(
    emoji.get("fire"),
    `Server started on port http://localhost:${PORT}`
  )
);
server.on("error", (err) => console.log(err));

export { arg };
