'use strict';

angular.module('fairManagerApp')
  .service('ErrorHandlingService', function () {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.getErrorMessage = function (error, context) {

      this.errorCode = error.status;
      this.errorMessage = 'An error has occured.';

      //If the errorCode is -1, we are unable to get any information from the error.
      //Hence we assume that the user has lost internet connection.
      if(this.errorCode === -1) {
        this.errorMessage = 'Unable to ' + context + '. Please check your internet connection.';
      }

      //422 - Unprocessable Entity
      else if(this.errorCode === 422) {
        var errObj = error.data.errors;
        //We want the first (and only) property of the errors object - in most cases this would be "email", but this is a generaliation.
        this.errorMessage = 'Unable to ' + context + '. ' +  errObj[Object.keys(errObj)[0]].message;
      }

      //401 and 403 - Unauthorized and forbidden
      else if(this.errorCode === 401 || this.errorCode === 403) {
        this.errorMessage = 'You do not have permission to ' + context + '. Please check your login credentials.';
      }

      //404 - Not found.
      else if(this.errorCode === 404) {
        this.errorMessage = 'Unable to find ' + context + '. Perhaps you manually entered a faulty URL, or did you click an expired link?';
      }

      //500 - Internal server error - special case for the settings
      else if(this.errorCode === 500 && context === 'settings') {
        var errObj = error.data.errors;

        //Similar to the 422 error above We want the first property of the errors object (primaryColour,accentColour etc)
        this.errorMessage = errObj[Object.keys(errObj)[0]].message;
      }
      //Unknown error code
      else {
        this.errorMessage = 'Unable to ' + context + '. An unexpected error with code ' + this.errorCode + ' occured. Please try again, and if the problem persists, contact us.';
      }

      return this.errorMessage;
    };
  });
