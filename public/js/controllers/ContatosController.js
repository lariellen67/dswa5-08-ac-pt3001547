angular
  .module('ifsp')
  .controller('ContatosController', function (Contato, $scope) {
    $scope.contatos = [];
    $scope.filtro = '';
    $scope.mensagem = { texto: '' };

    function buscarContatos() {
      Contato.query(
        function (contatos) {
          $scope.contatos = contatos;
          $scope.mensagem = {};
        },
        function (error) {
          console.log('Não foi possivel obter a lista de contatos');
          console.error(error);
          $scope.mensagem = {
            texto: 'Não foi possivel objer a lista de contatos',
          };
        }
      );
    }

    buscarContatos();

    $scope.remove = function (contato) {
      console.log(contato);
      Contato.delete({ id: contato._id }, buscarContatos, function (error) {
        console.log('Não foi possivel remover o contato');
        console.error(error);
        $scope.mensagem = { texto: 'Não foi possível remover o contato' };
      });
    };
  });
