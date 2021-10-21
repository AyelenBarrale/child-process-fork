
export async function renderLoginForm(req, res) {
  try {
    res.render("main");
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function facebookAuthentication(req, res) {
  try {
    if (req.isAuthenticated()) {
      res.redirect("/welcome");
    } else {
      res.redirect("/");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function failLog(req, res) {
  try {
    console.log("Credenciales no válidas");
    res.render("failLog", {});
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function logOk(req, res) {
  try {
    if (req.isAuthenticated()) {
      res.redirect("welcome", {
        nombre: req.user.displayName,
        foto: req.user.photos[0].value,
        mail: req.user.email,
      });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function renderWelcome(req, res) {
  try {
    res.render("welcome", {
      nombre: req.user.displayName,
      foto: req.user.photos[0].value,
      mail: req.user.email,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function renderLogout(req, res) {
  try {
    res.render("logout", {
      nombre: req.user.displayName,
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
}

export async function logout(req, res) {
  try {
    res.render("logout", {
      nombre: req.user.displayName,
    });
    req.logout()
    req.session.destroy((err) => {
      if (!err) {
        console.log("logout realizado");
      } else {
        res.json({ message: err });
      }
    });
  } catch (error) {
    res.status(400).send(error.message);
  }
}
