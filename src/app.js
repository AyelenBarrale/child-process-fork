import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import MongoStore from "connect-mongo";
import session from "express-session";
import handlebars from "express-handlebars";
import { fileURLToPath } from "url";
import { dirname } from "path";

import passport from "./utils/passport.util.js";

import loginRoutes from "./routes/login.route.js";
import infoRoute from "./routes/info.route.js";
import randomRoute from "./routes/random.route.js";

// Initializations
dotenv.config();
const app = express();

// middlewares
app.use(cors());
app.use((req, res, next) => {
  // Dominio que tengan acceso (ej. 'http://example.com')
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Metodos de solicitud que deseas permitir
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");

  // Encabecedados que permites (ej. 'X-Requested-With,content-type')
  res.setHeader("Access-Control-Allow-Headers", "*");

  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const options = { userNewUrlParser: true, useUnifiedTopology: true };

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      options,
    }),
    resave: true,
    saveUninitialized: false,
    secret: process.env.SECRET,
    cookie: {
      maxAge: 600000,
    },
    rolling: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//gets
app.get("/auth/facebook", passport.authenticate("facebook"));

app.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/welcome",
    failureRedirect: "/failLog",
  })
);

//settings
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    defaultLayout: "index",
    // eslint-disable-next-line no-undef
    layoutsDir: __dirname + "/views/layouts",
    // eslint-disable-next-line no-undef
    partialsDir: __dirname + "/views/partials",
  })
);

app.use(express.static("public"));

app.set("views", "./src/views");
app.set("view engine", ".hbs");

//routes
app.use("/", loginRoutes);
app.use("/", infoRoute);
app.use("/", randomRoute);

export { app };
