var Koa = require('koa');
var app = new Koa();
var router = require('koa-router')();
var cors = require('kcors');
var programs = require('./programs/routes')(router);

app.use(cors());

app.use(function *(next) {
    var start = new Date();
    yield next;
    var ms = new Date - start;
    console.log(`${this.method} ${this.url} - ${ms}`);
});

app.use(router.routes());

app.listen(3000);

