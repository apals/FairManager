'use strict';

describe('Controller: CompaniesController', function () {

  // load the controller's module
  beforeEach(module('fairManagerApp'));
  beforeEach(module('socketMock'));

  var scope;
  var CompaniesController;
  var $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/api/companies')
      .respond([
        {
          '_id': '56e82c4eee2b050acd3e28d6',
          'name': 'asd'
        }, {
          '_id': '56e82c63ee2b050acd3e28db',
          'name': '6'
        }, {
          '_id': '56e82c68ee2b050acd3e28dc',
          'name': '7'
        },
        {
          '_id': '56e82c70ee2b050acd3e28dd',
          'name': '8'
        }, {
          '_id': '56e82c76ee2b050acd3e28de',
          'name': '9'
        },
        {
          '_id': '56e8336306bf867b313c5d49',
          'name': 'asd'
        },
        {
          '_id': '56e84ffd07be77b7e4751604',
          'name': 'TestParty',
          'logoUrl': 'http://localhost:9000/assets/images/QS96p1pq_D5adt5Wsm8YTV9s.jpeg'
        }, {
          '_id': '56e8965757b178fe4a810897',
          'name': 'greger'
        },
        {
          '_id': '56e8965e57b178fe4a810898',
          'name': 'bertil'
        },
        {
          '_id': '56e9552adb8d3e6c2ff8a695',
          'name': 'hhhhh'
        },
        {
          '_id': '56eaa541c0cedfa40c802991',
          'name': 'asdas'
        }]);

    scope = $rootScope.$new();
    CompaniesController = $controller('CompaniesController', {
      $scope: scope
    });
  }));

  it('should attach a list of things to the controller', function () {
    $httpBackend.flush();
    console.log(CompaniesController.$scope);
    expect(scope.companies.length).toBe(11);
  });
});
