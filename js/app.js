var App = angular.module('App', [
'ngRoute',    
'controllers',
'services'   
    
]);


App.config(function($routeProvider, $httpProvider){
    $httpProvider.interceptors.push('TokenInterceptor');
                 
    
    $routeProvider
    .when('/', {
        templateUrl: 'views/read.html',
        controller: 'ReadCtrl',
         access: { requiredAuthentication: true}
    })
    .when('/menu-top', {
        templateUrl: 'views/menu-top.html',
        controller: 'MenuCtrl',
        access: { requiredAuthentication: true}
    })
    .when('/login', {
        templateUrl: 'login.html',
         controller: 'AdminUserCtrl',
         access: { requiredAuthentication: false }
    })    
       
    .when('/viagens', {
        templateUrl: 'views/read.html',
          controller: 'ReadCtrlTravel',
        access: { requiredAuthentication: true} 
    }) 
    
    .when('/message/:id', {
        templateUrl: 'views/messages.html',
        controller: 'MessagesCtrl',
         access: { requiredAuthentication: false }
    })
    
    .when('/create', {
        templateUrl: 'views/create.html',
        controller: 'CreateCtrl',
        access: { requiredAuthentication: true }
    }) 
    
    .when('/relatorios', {
        templateUrl: 'views/relatorios.html',
        controller: 'relCtrl',
        access: { requiredAuthentication: true}
    })
    
    .when('/edit/:id', {
        templateUrl: 'views/modais/mEditViagem.html',
        controller: 'EditCtrl',
        access: { requiredAuthentication: true }
    }) 
    
    .when('/viagem/:idViagem/lancamento/edit/:id', {
        templateUrl: 'views/modais/mEditLancamento.html',
        controller: 'EditLancamentoCtrl',
        access: { requiredAuthentication: true }
    }) 
    
    .when('/signup', {
        templateUrl: 'signup.html',
        controller: 'controllerSignUp',
        access: { requiredAuthentication: false}
    })
    
    .when('/viagem/add', {
        templateUrl: 'views/modais/mViagem.html',
        controller: 'ReadCtrl',
        access: { requiredAuthentication: true}
    })
            
    
    .when('/lancamentos/:id', {
        templateUrl: 'views/lancamento.html',
        controller: 'LancamentoCtrl',
        access: { requiredAuthentication: true }
    }) 
    .when('/:idViagem/lancamento/add', {
        templateUrl: 'views/modais/mLancamento.html',
        controller: 'LancamentoCtrl',
        access: { requiredAuthentication: true }
    }) 
    
    .otherwise({
        redirectTo: '/'
      });
});


App.run(function($rootScope, $location, $route, AuthenticationService, $window) {
     var nextPath = $location.path();
    var nextRoute = $route.routes[nextPath]
    
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
        if (nextRoute.access.requiredAuthentication && !$window.localStorage.isLogado) {            
            $location.path("/login");
        }
    });
});



//App.value('API', 'http://localhost:8080');
App.value('API', 'http://web-travelmanager.rhcloud.com');

