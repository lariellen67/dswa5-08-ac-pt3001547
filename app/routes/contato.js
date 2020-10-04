module.exports = function (app) {
  var controller = app.controllers.contato;
  app
    .route('/contatos')
    .get(controller.listaContatos)
    .post(controller.salvaContato);
  app
    .route('/contatos/:id')
    .get(controller.obtemContatos)
    .delete(controller.removeContato);
};
