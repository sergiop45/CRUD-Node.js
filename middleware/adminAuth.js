function adminAuth (req, res, next) {
    if (req.session.user != undefined) {
        var user = req.session.user.user;
        if(user == "admin"){
            next();
        }else {
            res.render("./users/bloqueio");
        }
        
    } else {
        res.redirect("/users/login");
    }
}

module.exports = adminAuth;