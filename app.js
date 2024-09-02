// Loading server packages
const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const {PORT,globalVariables} = require('./config/configurations');
const { selectOption } = require('./config/customFunctions');
const flash = require('connect-flash');
const session = require('express-session');
const methodOverride = require('method-override')


  // Initializng application
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "node_modules/bootstrap/dist")));
app.use(express.static(path.join(__dirname, "node_modules/bootstrap-icons")));
app.use(
  session({
    secret: "aapmsweb",
    saveUninitialized: true,
    resave: true,
  })
);
app.use(flash());
app.use(globalVariables);
app.engine(
  "handlebars",
  hbs.engine({ defaultLayout: "user", helpers: { select: selectOption } })
);
app.set("view engine", "handlebars");

// Configuring Method Override
app.use(methodOverride("action"));

// Configuring Routers
const userRouter = require("./routers/userRouter");
const adminRouter = require("./routers/adminRouter");
app.use('/', userRouter);
app.use('/admin', adminRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
  
  