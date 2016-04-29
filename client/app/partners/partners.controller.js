'use strict';


angular.module('fairManagerApp')
  .controller('PartnersCtrl', function ($scope, socket, PartnerService, ErrorHandlingService, Modal) {
    $scope.partners = [];
    $scope.isBusy = true;

    PartnerService.Partners.query(function (response) {
      $scope.partners = response;
      $scope.isBusy = false;
      socket.syncUpdates('partners', $scope.partners);
    }, function (error) {
      $scope.errorMsg = ErrorHandlingService.getErrorMessage(error, 'get partner');
    });

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('partners');
    });

    $scope.delete = Modal.confirm.delete(function (partner) {
      PartnerService.Partner.delete({id: partner._id}, function () {
        $scope.partners.splice($scope.partners.indexOf(partner), 1);
      }, function (error) {
        $scope.error = error.data;
        $scope.errorMsg = ErrorHandlingService.getErrorMessage(error, 'create event');

      });
    });

  });

