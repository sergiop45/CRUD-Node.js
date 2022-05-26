const bcrypt = require("bcryptjs");
const express = require("express");
const Router = express.Router();
const Users = require("./Users");
const adminAuth = require("../middleware/adminAuth");

Router.get("/users", adminAuth , (req, res) => {
    Users.findAll().then(users => {
        res.render("./users/users", {user: users});
    });
});

Router.get("/users/home", (req, res) => {
    res.render("./users/home", {usuario: req.session.user});
});


Router.get("/users/cadastro", adminAuth , (req, res) => {
    res.render("./users/cadastro", {teste: undefined});

});

Router.post("/users", (req,res) => {
    var user = req.body.user;
    var password = req.body.password;

    Users.findOne({where: {user: user}}).then(verificaEmail => {
        
        if (verificaEmail != undefined) {
            
            res.render("./users/cadastro", {teste: verificaEmail});
            
        } else {
            
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);

            Users.create({
                user: user,
                password: hash
                }).then(() => res.redirect("./users")).catch(() => res.redirect("./users/create"));
        }
        });

});

Router.get("/users/login", (req, res) => {
    
    res.render("./users/login", {userIncorret: false, adminIncorret: false });
});

Router.post("/users/authenticate", (req, res) => {
    var user = req.body.user;
    var password = req.body.password;

    Users.findOne({where: {user: user}}).then( user => {
        
        if (user != undefined) {
            
            var correct = bcrypt.compareSync(password, user.password);

            if (correct) {
                req.session.user = {
                    id: user.id,
                    user: user.user
                }
                res.redirect("/users/home");
            } else {
                
                res.render("./users/login", {userIncorret: true});
            }

        } else {
            res.render("./users/login", {userIncorret: true});
        }
    });

});

Router.get("/users/logout", (req, res) => {
    req.session.user = undefined;
    res.redirect("/users/login");
});

Router.get("/users/delete/:id", adminAuth, (req, res) => {
    var id = req.params.id;
    if(id != undefined) {
        if(!isNaN(id)) {
            Users.destroy({
                where: {
                    id:id
                }
            }).then(() => {
                res.redirect("/users");
            })
        }else {//se nao for numero
            res.redirect("/users");
        }
    } else {//se nao for definido
        res.redirect("/users");
    }
});

Router.get("/users/edit/:id", adminAuth ,(req, res) => {
    var id = req.params.id; 
    if(isNaN(id)) {
        res.redirect("/users");
    }   
    Users.findByPk(id).then(user => {
       
        if (id != undefined) {
            res.render("users/edit", {user:user});
        } else {
            res.redirect("/users");
        }
    }).catch(erro => {
        res.redirect("/users");
    });
})

Router.post("/users/update", (req, res) => {
    let user = req.body.user;
    let password= req.body.password;
    let id = req.body.id;
    
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

        Users.update({
            user: user,
            password: hash
    }, {where: {id:id}}).then(res.redirect("/users")).catch(res.redirect("/users/edit"))
})

module.exports = Router;