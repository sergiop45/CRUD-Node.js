const Sequelize = require("sequelize");
const connection = require("../database/database");

const Clientes = connection.define("clientes",  {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
        },
    telefone: {
        type: Sequelize.STRING,
        allowNull: false
        },
    emailClient: {
        type: Sequelize.STRING,
        allowNull: false
    },
    endereco: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf: {
        type: Sequelize.STRING,
        allowNull: false
    },
    observacao: {
        type: Sequelize.STRING,
        allowNull: false
    }
    
    
});

Clientes.sync({force: false}).then(console.log("tabela clientes criada")).catch((error) => console.log("erro tabela Clientes "+error));

module.exports = Clientes;