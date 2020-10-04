var ID_CONTATO_INC = 4;

var contatos = [
  { _id: 1, nome: 'Larissa Marques', email: 'larissa.marques@ifsp.edu.br' },
  { _id: 2, nome: 'Rodrigo Inoue', email: 'rodrigo.inoue@ifsp.edu.br' },
  { _id: 3, nome: 'Gabriela Mota', email: 'gabriela.mota@ifsp.edu.br' },
  { _id: 4, nome: 'Daniel Samarone', email: 'daniel.samarone@ifsp.edu.br' },
];

module.exports = function (app) {
  var Contato = app.models.contato;
  var controller = {};
  controller.listaContatos = function (req, res) {
    Contato.find()
      .exec()
      .then(
        function (contatos) {
          res.json(contatos);
        },
        function (error) {
          console.error(error);
          res.status(500).json(error);
        }
      );
  };

  controller.obtemContatos = function (req, res) {
    var _id = req.params.id;
    Contato.findById(_id)
      .exec()
      .then(
        function (contato) {
          if (!contato) throw new Error('Contato não encontrado');
          res.json(contato);
        },
        function (error) {
          console.log(error);
          res.status(404).json(error);
        }
      );
  };

  controller.removeContato = function (req, res) {
    var _id = req.params.id;
    Contato.deleteOne({ _id: _id })
      .exec()
      .then(
        function () {
          res.end();
        },
        function (error) {
          return console.error(error);
        }
      );
  };

  controller.salvaContato = function (req, res) {
    var _id = req.body._id;
    if (_id) {
      Contato.findByIdAndUpdate(_id, req.body)
        .exec()
        .then(
          function (contato) {
            res.json(contato);
          },
          function (error) {
            console.error(error);
            res.status(500).json(error);
          }
        );
    } else {
      Contato.create(req.body).then(
        function (contato) {
          res.status(201).json(contato);
        },
        function (error) {
          console.log(error);
          res.status(500).json(error);
        }
      );
    }
  };

  function adiciona(contatoNovo) {
    contatoNovo._id = ++ID_CONTATO_INC;
    contatos.push(contatoNovo);
    return contatoNovo;
  }

  function atualiza(contatoAlterar) {
    contatos = contatos.map(function (contato) {
      if (contato._id == contatoAlterar._id) {
        contato = contatoAlterar;
      }
      return contato;
    });
    return contatoAlterar;
  }

  return controller;
};
