var User = require('./class/user.js');

module.exports = function (app, passport, request, nodeWidget, fs) {
    var cookieParser = require('cookie-parser');
    app.use(cookieParser());

    app.get('/', function (req, res) {
        res.redirect('/login');
    });

    app.get('/login', function (req, res) {
        res.sendFile('/app/views/login.html', {
            message: req.flash('loginMessage')
        });
    });

    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    }));

    app.get('/register', function (req, res) {
        res.sendFile('/app/views/signup.html');
    });

    app.post('/register', passport.authenticate('local-signup', {
        successRedirect: '/login',
        failureRedirect: '/register',
        failureFlash: true
    }));

    app.get('/dashboard', isLoggedIn, function (req, res, next) {
        res.sendFile('/app/views/dashboard.html');
    });

    // app.get('/:username/:password', function (req, res) {
    //     var newUser = new User();
    //     newUser.local.username = req.params.username;
    //     newUser.local.password = req.params.password;
    //     console.log(newUser.local.username + " " + newUser.local.password);
    //     newUser.save(function (err) {
    //         if (err)
    //             throw err;
    //     });
    //     res.send("Success!");
    // });

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.get('/about.json', function (req, res) {
        res.sendFile('/app/about.json');
    });

    app.get('/cookieset', function (req, res) {
        var cookie = req.query
        res.cookie(cookie.name, {
            name: cookie.type,
            value: cookie.value,
            idTime: cookie.idTime
        })
        res.send(req.cookies[cookie.name]);
    });

    app.get('/cookieclear', function (req, res) {
        var idTime = req.query
        var cookies = req.cookies
        var test = Object.keys(cookies)
        var value;
        idTime = idTime.idTime
        idTime = idTime.substring(3, idTime.length)
        i = 1;
        while (i <= test.length) {
            value = req.cookies[test[i]]
            value = value.idTime
            if (value == idTime) {
                res.clearCookie(test[i]);
                res.send("good")
                return
            }
            i += 1;
        }
        res.send("error")
    });

    app.get('/cookieget', function (req, res) {
        res.send(req.cookies);
    });

    app.get('/refresh', function (req, res) {
        i = 1
        var value;
        var cookies = req.cookies;
        var list = Object.keys(cookies)
        var str;
        while (i <= list.length) {
            value = req.cookies[list[i]]
            try {
                if (value.name != "undefined" && value != "undefined")
                    str += JSON.stringify(value)
            }
            catch (error) {
                res.send(str)
            }
            i += 1;
        }
    });
};


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}