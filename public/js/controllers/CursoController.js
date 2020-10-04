angular
  .module('ifsp')
  .controller('CursoController', function ($scope, $routeParams, Curso) {
    if ($routeParams.cursoId) {
      Curso.get(
        { id: $routeParams.cursoId },
        function (curso) {
          $scope.curso = curso;
        },
        function (error) {
          $scope.mensagem = { texto: 'Não foi possivel obter o curso' };
          console.log($routeParams.cursoId);
          console.error(error);
        }
      );
    } else {
      $scope.curso = new Curso();
    }

    $scope.salva = function () {
      $scope.curso
        .$save()
        .then(function () {
          $scope.mensagem = { texto: 'Curso salvo com sucesso!' };
          $scope.curso = new Curso();
        })
        .catch(function (error) {
          $scope.mensagem = { texto: 'Não foi possível salvar o curso :(' };
          console.error(error);
        });
    };
  });
