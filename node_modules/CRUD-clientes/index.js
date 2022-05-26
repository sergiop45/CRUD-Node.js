const express = require("express");
const app = express();
const port = 3535;
const connection = require("./database/database");
const Clientes = require("./cliente/Clientes");
const bodyParser = require("body-parser");
const clienteController = require("./cliente/clienteController")
const produtoController = require("./produto/produtoController")
const Produto = require("./produto/Produto");
const usersController = require("./users/usersController");
const Users = require("./users/Users");
const session = require("express-session");
const adminAuth = require("./middleware/adminAuth");
const userAuth = require("./middleware/userAuth");

connection.authenticate()
.then(() => console.log("Conexao realizaa com DB"))
.catch((error) => console.log("erro ao conectar ao DB "+error))

app.use(session({
    secret: "saltsalt", cookie: {maxAge: 600000}
}));

app.use(express.static('public'));

app.set("view engine", "ejs");
app.set("views", "./views");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());



app.get("/", (req, res) => {
    res.redirect("/users/login");
});

app.use("/", usersController);

app.use("/", userAuth, clienteController);

app.use("/", userAuth, produtoController);


app.listen(port, () => {
    console.log("CRUD rodando na Porta " + port);
});