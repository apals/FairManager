'use strict';

describe('Controller: CompaniesController', function() {

  // load the controller's module
  beforeEach(module('fairManagerApp'));
  beforeEach(module('socketMock'));

  var scope;
  var MainController;
  var $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/things')
      .respond(['HTML5 Boilerplate', 'AngularJS', 'Karma', 'Express']);

    scope = $rootScope.$new();
    MainController = $controller('MainController', {
      $scope: scope
    });
  }));

  it('should attach a list of things to the controller', function() {
    $httpBackend.flush();
    expect(MainController.companies.length).toBe(4);
  });
});
