'use strict';
var gzippo = require('gzippo');
var express = require('express');
var app = express();
var flash = require('connect-flash');

var sendgrid =  require('sendgrid')(
    process.env.SENDGRID_USERNAME || 'app23876769@heroku.com',
    process.env.SENDGRID_PASSWORD || 'jlvjklav'
);

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.configure(function(){
    app.use(express.urlencoded());
    app.use(express.json());
    app.use(express.methodOverride());
    app.use(express.cookieParser('keyboard cat'));
    app.use(express.session( {secret : 'ayelen'}));
    app.use(flash());
    app.use(app.router);
    app.set('views', __dirname);
    app.use(gzippo.staticGzip(__dirname));
});

app.get('/',function(req,res){
    var error = req.flash('error');
    var success = req.flash('success');
    var messages = {};
    if(error !== ''){
        messages.error = error.join('');
    }
    if(success!==''){
        messages.success = success.join('');
    }
    console.log(messages);
    res.render('index',{messages:messages});
});

app.post('/contact', function (req, res) {
    var from = req.body.from;
    var text = 'Contacto de '+req.body.name+':\n\n';
    text = text + req.body.text;
    var spam = req.body.spam;
    if(spam===''){
        var email = new sendgrid.Email({
            to:'contacto@ayelenhospedaje.com',
            from:from,
            subject:'Contacto desde web de Ayelen',
            text:text
        });

        sendgrid.send(email,function(err,json){
            if(err){
                req.flash('error','No se pudo enviar tu email. Intenta nuevamente');
                res.redirect('/');
                return console.log(err);
            }
            req.flash('success','Mensaje enviado correctamente.');
            res.redirect('/');
        });
    }else{
        req.flash('error','Acaso eres un robot???');
        res.redirect('/');
    }

});
var port = process.env.PORT || 3000;
app.listen(port,function(){
    console.log('Express server listening on port %d in %s mode', port, app.settings.env);
});
