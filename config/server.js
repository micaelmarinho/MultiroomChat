var express = require("express");
var consign = require("consign");
var bodyParser = require("body-parser");
var expressValidator = require("express-validator");

var app = express();

//Configurações Gerais
app.set("view engine", "ejs");
app.set("views", "./app/views");

//Middlewares
app.use(express.static("./app/public"));
//Permite recuperar os dados da requisição em formato JSON.
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());

//Autoload dos módulos com consign
consign()
    .include("app/routes")
    .then("app/models")
    .then("app/controllers")
    .into(app);

module.exports = app;