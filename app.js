// app.js
angular.module('wikiApp', [])

// allow DI for use in controllers, unit tests
.constant('_', window._)
// use in views, ng-repeat="x in _.range(3)"
.run(function ($rootScope) {
  $rootScope._ = window._;
})
// 
.factory('wikiService', function($http) {

  
  var wikiService = {
    get: function(search) {
      return $http.jsonp('http://en.wikipedia.org/w/api.php?action=opensearch&search=' +
                         search +
                         '&limit=10&namespace=0&format=json&callback=JSON_CALLBACK');
    }
  };

  return wikiService;
})
.controller('MainController', function($scope, wikiService, $http) {
  var vm = this;
  
  vm.searchWiki = searchWiki;
  
  function searchWiki(search) {
    vm.wikiData = {};
    
    wikiService.get(search).then(function(data) {
      console.log(data);
      vm.wikiData.results = _.zip(data.data[1], data.data[2], data.data[3]);
      vm.wikiData.searchTerm = data.data[0].toString();
    });
  }

});