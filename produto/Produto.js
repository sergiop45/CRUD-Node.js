const Sequelize = require("sequelize");
const connection = require("../database/database");

const Produtos = connection.define("produtos", {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    valor: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

Produtos.sync({force: false}).then(console.log("tabela Produtos criada")).catch((error) => console.log("erro tabela Clientes "+error));

module.exports = Produtos;