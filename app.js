(function () {

  'use strict';

  angular.module('NarrowItDownApp', [])
    .controller('NarrowItDownController', NarrowItDownController)
    .service('MenuSearchService', MenuSearchService)
    .directive('foundItems', FoundItemsDirective)
    .constant('ApiBasePath', 'https://coursera-jhu-default-rtdb.firebaseio.com/menu_items.json');

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var narrowCtrl = this;
    narrowCtrl.searchTerm = '';
    narrowCtrl.foundItems = [];
    narrowCtrl.showNoResultsMessage = false;

    narrowCtrl.searchMenuItems = function () {
      if (narrowCtrl.searchTerm.trim() === '') {
        narrowCtrl.showNoResultsMessage = true;
        narrowCtrl.foundItems = [];
        return;
      }

      MenuSearchService.getMatchedMenuItems(narrowCtrl.searchTerm)
        .then(function (response) {
          narrowCtrl.foundItems = response;
          narrowCtrl.showNoResultsMessage = narrowCtrl.foundItems.length === 0;
        })
        .catch(function (error) {
          console.log('Error occurred while retrieving menu items:', error);
          narrowCtrl.showNoResultsMessage = true;
        });
    };

    narrowCtrl.removeItem = function (index) {
      narrowCtrl.foundItems.splice(index, 1);
    };
  }


  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function (searchTerm) {
      return $http({
        method: 'GET',
        url: ApiBasePath
      }).then(function (response) {
        var menuItems = [];
        for (var categoryKey in response.data) {
          if (response.data.hasOwnProperty(categoryKey)) {
            var category = response.data[categoryKey];
            var items = category.menu_items.filter(function (item) {
              return item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
            });
            menuItems = menuItems.concat(items);
          }
        }
        return menuItems;
      });
    };
  }


  function FoundItemsDirective() {
    var ddo = {
      restrict: 'E',
      template: '{{ item.name }}',
      scope: {
        items: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'foundCtrl',
      bindToController: true
    };
    return ddo;
  }
  

  function FoundItemsDirectiveController() {
    var foundCtrl = this;

    foundCtrl.isEmpty = function () {
      return foundCtrl.items && foundCtrl.items.length === 0;
    };
  }

})();
