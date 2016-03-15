'use strict';

(function() {

class AdminController {
  constructor(User) {
    // Use the User $resource to fetch all users
    this.user = User;
    this.users = User.query();
  }

  create(user) {
  	var newUser = new this.user(user);
  	console.log("creating user");
  	var that = this;
  	newUser.$save(function(response) {
  		that.users.push(user);
  	}, function(error) {
  		this.create.error ="There was an error creating the user";
  	});
  }

  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }
}

angular.module('fairManagerApp.admin')
  .controller('AdminController', AdminController);

})();
