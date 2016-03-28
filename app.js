// app.js
angular.module('wikiApp', [])


.factory('wikiService', function($http) {

  
  var wikiService = {
    get: function(search) {
      return $http.jsonp('http://en.wikipedia.org/w/api.php?action=query&titles=' + search + '&prop=revisions&rvlimit=max&rvprop=content&list=backlinks&bltitle=' + search + '&bllimit=55&format=json&callback=JSON_CALLBACK');
    }
  };

  return wikiService;
})
.controller('MainController', function($scope, wikiService, $http) {
  var vm = this;
  
  vm.searchWiki = searchWiki;
  
  function searchWiki(search) {
    wikiService.get(search).then(function(data) {
      console.log(data);
      $scope.wikiData = data.data.query;
    });
  }

});