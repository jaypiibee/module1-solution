(function () {

  'use strict';

  angular.module('ShoppingListApp', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
    // .provider('ShoppingList', ShoppingListProvider);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;
    toBuy.items = ShoppingListCheckOffService.getToBuyItems();

    toBuy.buyItem = function (index) {
      ShoppingListCheckOffService.buyItem(index);
    };
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var alreadyBought = this;
    alreadyBought.items = ShoppingListCheckOffService.getAlreadyBoughtItems();
  }

  function ShoppingListCheckOffService() {
      var service = this;
      var toBuyItems = [
        { name: 'Cookies', quantity: 10 },
        { name: 'Banana Catsup', quantity: 8 },
        { name: 'Alcohol', quantity: 5 },
        { name: 'Cola', quantity: 4 },
        { name: 'Egg', quantity: 1 }
      ];
      var boughtItems = [];
  
      service.buyItem = function (index) {
        var item = toBuyItems[index];
        toBuyItems.splice(index, 1);
        boughtItems.push(item);
      };
  
      service.getToBuyItems = function () {
        return toBuyItems;
      };
  
      service.getAlreadyBoughtItems = function () {
        return boughtItems;
      };
    }



      // using provider

  // function ShoppingListCheckOffService() {
  //   var service = this;
  //   var toBuyItems = [
  //     { name: 'Cookies', quantity: 10 },
  //     { name: 'Banana Catsup', quantity: 8 },
  //     { name: 'Alcohol', quantity: 5 },
  //     { name: 'Cola', quantity: 4 },
  //     { name: 'Egg', quantity: 1 }
  //   ];
  //   var boughtItems = [];

  //   service.buyItem = function (index) {
  //     var item = toBuyItems[index];
  //     toBuyItems.splice(index, 1);
  //     boughtItems.push(item);
  //   };

  //   service.getToBuyItems = function () {
  //     return toBuyItems;
  //   };

  //   service.getAlreadyBoughtItems = function () {
  //     return boughtItems;
  //   };
  // }

  // function ShoppingListProvider() {
  //   var provider = this;
  //   provider.defaults = {
  //     maxItems: 3
  //   };

  //   provider.$get = function () {
  //     var shoppingList = new ShoppingListCheckOffService();

  //     shoppingList.getItemsToBuy = function () {
  //       return shoppingList.getToBuyItems(provider.defaults.maxItems);
  //     };

  //     return shoppingList;
  //   };
  // }

})();
