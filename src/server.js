var express = require("express");
require("./db/mongoose");
var userRouter = require("./router/users");

var app = express();
var port = process.env.PORT || 3000;
app.use(express.json());
app.use(userRouter);

app.listen(port, () => {
  console.log(`server is up on port ${port} `);
});
