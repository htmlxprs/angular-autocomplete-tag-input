angular.module('com.htmlxprs.autocomplete.directives',[]).directive('autoComplete',['$http','$timeout',function($http,$timeout){
    return {
        restrict:'AE',
        scope:{
            selectedTags:'=model'
        },
        templateUrl:'/views/autocomplete-template.html',
        link:function(scope,elem,attrs){

            scope.suggestions=[];

            scope.selectedTags=[];

            scope.shiftFocus=function(event){
                if(event.keyCode===40) {
                    $timeout(function(){
                        elem.find('#suggestions').focus();
                        scope.selectedIndex=0;
                    });
                }
            }

            scope.removeTag=function(index){
                scope.selectedTags.splice(index,1);
            }

            scope.search=function(){
                $http.get(attrs.url+'?term='+scope.searchText).success(function(data){
                    if(data.indexOf(scope.searchText)===-1){
                        data.unshift(scope.searchText);
                    }
                    scope.suggestions=data;
                });
            }

            scope.addToSelectedTags=function(index){
                if(scope.selectedTags.indexOf(scope.suggestions[index])===-1){
                    scope.selectedTags.push(scope.suggestions[index]);
                    scope.searchText='';
                    scope.selectedIndex=-1;
                    scope.suggestions=[];
                    elem.find('#searchInput').focus();
                }
            }

            scope.checkKeyDown=function(event){
                //arrow down
                if(event.keyCode===40){
                    if(scope.selectedIndex+1 !== scope.suggestions.length){
                        scope.selectedIndex++;
                    }
                }
                //arrow up
                else if(event.keyCode===38){
                    if(scope.selectedIndex-1 !== -1){
                        scope.selectedIndex--;
                    }
                }
                //enter
                else if(event.keyCode===13){
                    scope.addToSelectedTags(scope.selectedIndex);
                }
            }
        }
    }
}]);