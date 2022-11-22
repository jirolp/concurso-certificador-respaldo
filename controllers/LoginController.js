const bcrypt = require('bcrypt');

function login(req,res) {
    if(req.session.loggedin != true) {
        res.render('login');
    } else {
        res.redirect('/')
    }
}

function auth(req, res) {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM usuarios WHERE username = ?', [data.username], (err, userdata) => {
            if(userdata.length > 0) {
                userdata.forEach(element => {
                    bcrypt.compare(data.password, element.password, (err, isMatch) => {
                    
                    if(!isMatch) {
                        res.render('login');
                        console.log('incorrect password');
                    } else {
                        console.log('welcome');
                        req.session.loggedin = true;
                        req.session.name = element.username;

                        res.redirect('/');
                    }
                    });
                });
            } else {
                console.log('user not exists');
                res.render('login');
            }
        });
    });
}

function register(req,res) {
    if(req.session.loggedin != true) {
        res.render('registro');
    } else {
        res.redirect('/')
    }
    
}

function storeUser(req, res) {
    const data = req.body;

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM usuarios WHERE username = ?', [data.username], (err, userdata) => {
            if(userdata.length > 0) {
                console.log('user already created');
                res.render('registro');
            } else {
                bcrypt.hash(data.password, 12).then(hash => {    
                    data.password = hash;
            
                    req.getConnection((err, conn) => {
                        if (data.id_cargo == 'Vendedor') {
                            data.id_cargo = '001';
                        } else {
                            data.id_cargo = '002';
                        }
                        conn.query('INSERT INTO usuarios SET ?', [data], (err, rows) => {
                            //console.log(err);
                            //console.log(data.id_cargo);
                            //console.log(data);
                            req.session.loggedin = true;
                            req.session.name = data.username;

                            res.redirect('/');
            
                        });
                    });
                });
            }
        });
    });

    
}

function logout(req, res) {
    if(req.session.loggedin == true) {

        req.session.destroy();

    } 
    res.redirect('login')
    
}
module.exports = {
    login,
    register,
    storeUser,
    auth,
    logout,
}
