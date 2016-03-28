// app.js
angular.module('wikiApp', [])


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
      vm.wikiData = data.data;
    });
  }

});