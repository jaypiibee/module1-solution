
// Define the modeule and controller
angular.module('foodChecker',[]).controller('outputController', outputController);

// Inject dependencies using array notation
outputController.$inject = ['$scope'];

// Define controller function
function outputController($scope){
  var a = this;

  a.foodItems = "";
  a.message = "";
  a.clicked = false;

  // Define checkFood function
  a.checkFood = function(){

    // Split input into array and remove empty string 
    var foodArray = a.foodItems.split(",").filter(item => item.trim() !== "");

    if(!a.foodItems) {
      a.message = "Please enter data first";
      return;
    }

    if(foodArray.length <= 3) {
      a.message = "Enjoy";
      a.changeColor();
    }
    else{
      a.message = "To Much!";
      a.changeColor();
    }

  };

  a.changeColor = function(){
    a.clicked = true;
  };
}
