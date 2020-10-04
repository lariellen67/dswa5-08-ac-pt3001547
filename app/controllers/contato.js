var ID_CONTATO_INC = 4;

var contatos = [
  { _id: 1, nome: 'Larissa Marques', email: 'larissa.marques@ifsp.edu.br' },
  { _id: 2, nome: 'Rodrigo Inoue', email: 'rodrigo.inoue@ifsp.edu.br' },
  { _id: 3, nome: 'Gabriela Mota', email: 'gabriela.mota@ifsp.edu.br' },
  { _id: 4, nome: 'Daniel Samarone', email: 'daniel.samarone@ifsp.edu.br' },
];

module.exports = function () {
  var controller = {};
  controller.listaContatos = function (req, res) {
    res.json(contatos);
  };
  controller.obtemContatos = function (req, res) {
    console.log('Contato selecionado: ' + req.params.id);
    const { id } = req.params;
    const contato = contatos.filter(function (contato) {
      return contato._id == id;
    })[0];
    contato
      ? res.json(contato)
      : res.status(404).send('Contato não encontrado');
  };

  controller.removeContato = function (req, res) {
    const { id } = req.params;
    contatos = contatos.filter(function (contato) {
      return contato._id != id;
    });
    res.status(204).send('Contato deletado').end();
  };

  controller.salvaContato = function (req, res) {
    var contato = req.body;
    contato = contato._id ? atualiza(contato) : adiciona(contato);
    res.json(contato);
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
