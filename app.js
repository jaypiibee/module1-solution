(function () {
'use strict';

  // Define the modeule and controller
  angular.module('foodChecker',[])
  .controller('outputController', outputController)
  .filter('custom', FilterCustomized);

  // Inject dependencies using array notation
  outputController.$inject = ['$scope','$filter','customFilter'];

  // Define controller function
  function outputController($scope,$filter,customFilter){
    var a = this;
    var f = $filter;
    var cf = customFilter;

    a.otherMessage = "";
    a.foodItems = "";
    a.message = "";
    a.clicked = false;

    // Define checkFood function
    a.checkFood = function(){

      // Split input into array and remove empty string 
      var foodArray = a.foodItems.split(",").filter(item => item.trim() !== "");
      
      if(!a.foodItems) {
        a.message = "Please enter data first";
        a.otherMessage = cf(a.message);
        return a.UpperCase(a.message);
      }

      if(foodArray.length <= 3) {
        a.message = "Enjoy";
        a.changeColor();
      }
      else{
        a.message = "To Much!";
        a.changeColor();
      }
      a.otherMessage = cf(a.message);
      
      a.UpperCase(a.message);

    };

    a.UpperCase = function(messageOutput){
        a.message = f('uppercase')(messageOutput);
    }

    a.changeColor = function(){
      a.clicked = true;
    };

    // convert to other messsage using custom filter
    
  }

  function FilterCustomized() {
    return function (input) {

      if(input == "Enjoy"){
        input = input.replace(input, "That's enough food")
      }
      else if (input == "To Much!"){
        input = input.replace(input, "That's execive food")
      }
      else{
        input = input.replace(input, "No Data input")
      }

      return input;
    }
  }

})();

//CustomFilters
//WATCHERS