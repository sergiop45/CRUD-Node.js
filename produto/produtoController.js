const express = require("express");
const adminAuth = require("../middleware/adminAuth");
const Router = express.Router();
const Produto = require("./Produto");

Router.get("/produto/cadastro", (req, res) => {
    res.render("produto/cadastro");
});

Router.get("/produto", (req, res) => {
    Produto.findAll().then(produto => {
        res.render("produto/produto", {produto: produto});
    });
});

Router.get("/produto/relatorio", (req, res) => {
    Produto.findAll().then(produto => {
        res.render("produto/relatorio", {produto: produto});
    });
});

Router.post("/produto", (req, res) => {
    let name = req.body.nome;
    let valor = req.body.valor;
    let quantidade = req.body.quantidade;

    Produto.create({
        nome: name,
        valor: valor,
        quantidade: quantidade
    }).then(res.redirect("/produto")).catch(res.redirect("/produto/cadastro"))
});


Router.get("/produto/delete/:id", adminAuth , (req, res) => {
    var id = req.params.id;
    if(id != undefined) {
        if(!isNaN(id)) {
            Produto.destroy({
                where: {
                    id:id
                }
            }).then(() => {
                res.redirect("/produto");
            })
        }else {//se nao for numero
            res.redirect("/produto");
        }
    } else {//se nao for definido
        res.redirect("/produto");
    }
});

Router.get("/produto/edit/:id", adminAuth ,(req, res) => {
    var id = req.params.id; 
    if(isNaN(id)) {
        res.redirect("/produto");
    }   
    Produto.findByPk(id).then(produto => {
       
        if (id != undefined) {
            res.render("produto/edit", {produto:produto});
        } else {
            res.redirect("/produto");
        }
    }).catch(erro => {
        res.redirect("/produto");
    });
})

Router.post("/produto/update", (req, res) => {
    let nome = req.body.nome;
    let quantidade = req.body.quantidade;
    let valor = req.body.valor;
    let id = req.body.id;
    
    Produto.update({
        nome: nome,
        valor: valor,
        quantidade: quantidade
        
    }, {where: {id:id}}).then(res.redirect("/produto")).catch(res.redirect("/produto/edit"))
})


module.exports = Router;
