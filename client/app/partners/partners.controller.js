'use strict';


angular.module('fairManagerApp')
  .controller('PartnersCtrl', function ($scope, socket, PartnerService, Modal) {
    $scope.partners = [];
    $scope.isBusy = true;

    PartnerService.Partners.query(function (response) {
      $scope.partners = response;
      $scope.isBusy = false;
      socket.syncUpdates('partners', $scope.partners);
    });

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('partners');
    });

    $scope.delete = Modal.confirm.delete(function(partner) {
      PartnerService.Partner.delete({id: partner._id},function(response) {
        angular.forEach($scope.partners, function(u, i) {
          if (u === partner) {
            $scope.partners.splice(i, 1);
          }
        });
      });
    });

  });

