// não mexa nestas 3 linhas!
var express = require('express');
var router = express.Router();
var banco = require('../app-banco');
// não mexa nessas 3 linhas!

router.post('/entrar', function (req, res, next) {

  banco.conectar().then(() => {
    console.log(`Chegou p/ login: ${JSON.stringify(req.body)}`);
    var login = req.body.login; // depois de .body, use o nome (name) do campo em seu formulário de login
    var senha = req.body.senha; // depois de .body, use o nome (name) do campo em seu formulário de login
    if (login == undefined || senha == undefined) {
      throw new Error(`Dados de login não chegaram completos: ${login} / ${senha}`);
    }
    return banco.sql.query(`select * from Clientes where email='${login}' and senha='${senha}'`);
  }).then(consulta => {

    console.log(`Logins encontrados: ${JSON.stringify(consulta.recordset)}`);

    if (consulta.recordset.length==1) {
      res.send(consulta.recordset[0]);
    } else {
      res.sendStatus(404);
    }

  }).catch(err => {

    var erro = `Erro no login: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});







router.post('/cadastro', function (req, res, next) {

  banco.conectar().then(() => {
    console.log(`Chegou p/ login: ${JSON.stringify(req.body)}`);
    var nome = req.body.nome; // depois de .body, use o nome (name) do campo em seu formulário de login
    var rg = req.body.rg;
    var cpf = req.body.cpf; // depois de .body, use o nome (name) do campo em seu formulário de login
    var login = req.body.login;
    var senha = req.body.senha;
    if (login == undefined || senha == undefined || nome == undefined || rg == undefined || cpf == undefined ) {
      throw new Error(`Dados de login não chegaram completos: ${login} / ${senha} / ${nome} / ${rg} / ${cpf}`);
    }
    return banco.sql.query(`insert into  Clientes values  ('${nome}', '${rg}', '${cpf}', '${login}', '${senha}')`);
  }).then(consulta => {

    console.log(`Logins encontrados: ${JSON.stringify(consulta.recordset)}`);

   res.sendStatus(201)

  }).catch(err => {

    var erro = `Erro no login: ${err}`;
    console.error(erro);
    res.status(500).send(erro);

  }).finally(() => {
    banco.sql.close();
  });

});












// não mexa nesta linha!
module.exports = router;