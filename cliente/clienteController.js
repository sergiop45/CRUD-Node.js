const express = require("express");
const adminAuth = require("../middleware/adminAuth");
const Router = express.Router();
const Clientes = require("./Clientes");

Router.get("/cliente/cadastro", (req, res) => {
    res.render("client/cadastro");
});

Router.get("/cliente", (req, res) => {
    Clientes.findAll().then(cliente => {
        res.render("client/clientes", {cliente: cliente});
    });
});

Router.get("/cliente/relatorio", (req, res) => {
    Clientes.findAll().then(cliente => {
        res.render("client/relatorio", {cliente: cliente});
    });
});

Router.post("/cliente", (req, res) => {
    let name = req.body.name;
    let phone = req.body.phone;
    let email = req.body.email;
    let cpf = req.body.cpf;
    let adress = req.body.adress;
    let observacao = req.body.observacao;

    Clientes.create({
        nome: name,
        telefone: phone,
        emailClient: email,
        cpf: cpf,
        endereco: adress,
        observacao: observacao
    }).then(res.redirect("/cliente")).catch(res.redirect("/cliente/cadastro"))
});

Router.get("/cliente/edit/:id", (req, res) => {
    var id = req.params.id; 
    if(isNaN(id)) {
        res.redirect("/cliente");
    }   
    Clientes.findByPk(id).then(clientes => {
       
        if (id != undefined) {
            res.render("client/edit", {cliente:clientes});
        } else {
            res.redirect("/cliente");
        }
    }).catch(erro => {
        res.redirect("/cliente");
    });
})

Router.post("/cliente/update", (req, res) => {
    let name = req.body.name;
    let phone = req.body.phone;
    let email = req.body.email;
    let cpf = req.body.cpf;
    let adress = req.body.adress;
    let observacao = req.body.observacao;
    let id = req.body.id;
    
    Clientes.update({
        nome: name,
        telefone: phone,
        emailClient: email,
        cpf: cpf,
        endereco: adress,
        observacao: observacao
    }, {where: {id:id}}).then(res.redirect("/cliente")).catch(res.redirect("/cliente/edit"))
})

Router.get("/cliente/delete/:id", adminAuth , (req, res) => {
    var id = req.params.id;
    if(id != undefined) {
        if(!isNaN(id)) {
            Clientes.destroy({
                where: {
                    id:id
                }
            }).then(() => {
                res.redirect("/cliente");
            })
        }else {
            res.redirect("/cliente");
        }
    } else {
        res.redirect("/cliente");
    }
});

module.exports = Router;
