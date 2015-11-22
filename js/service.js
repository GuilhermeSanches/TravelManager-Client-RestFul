var App = angular.module('services', []);

App.factory('Viagens', function($http, API){	
	return {
		read: function(){
			return $http.get(API+'/viagens');
		},
        readLancamento: function(id){
			return $http.get(API+'/viagem/'+id+'/lancamentos');
		},
        deleteLancamento: function(idViagem, id){
			return $http.delete(API+'/viagem/'+idViagem+'/lancamento/'+id);
		},
        
        createLancamento: function(idViagem, newLancamento){
			return $http.post(API+'/viagem/'+idViagem+'/lancamentos', newLancamento);
		},
		profileLancamento: function(idViagem, id){
			return $http.get(API+'/viagem/'+idViagem+'/lancamento/'+id);	
		},	
		updateLancamento: function(item, id,idLancamento){
			return $http.put(API+'/viagem/'+id+'/lancamento/'+idLancamento, item);	
		},
		create: function(item){
			return $http.post(API+'/viagens', item);
		},
		profile: function(id){
			return $http.get(API+'/viagem/'+id);	
		},
		update: function(item, id){
			return $http.put(API+'/viagem/'+id, item);	
		},
		delete: function(id){
			return $http.delete(API+'/viagem/'+id);
		}
	}
});

App.factory('Login', function($http, API){	
	return {
		read: function(){
			return $http.get(API+'/auth/facebook');
		}		
	}
});


App.factory('Categorias', function($http, API){	
	return {
		read: function(){
			return $http.get(API+'/categorias');
		}		
	}
});

App.factory('Messages', function($http, API){	
	return {
		readMessage: function(id){
			return $http.get(API+'/message/'+id);
		}		
	}
});

App.factory('AuthenticationService', function($rootScope) {
    $rootScope.auth = {
        isLogged: false        
    }
 
    return $rootScope.auth;
});


App.factory('UserService', function($http, API) {
    return {
        logIn: function(username, password) {
            return $http.post(API + '/authenticate', {user: username, pass: password});
        },
 
        logOut: function() {
 
        }
    }
});


App.factory('TokenInterceptor', function ($q, $window, $location, AuthenticationService) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization =$window.sessionStorage.token;                
            }
            return config;
        },
 
        requestError: function(rejection) {
            return $q.reject(rejection);
        },
 
        /* Set Authentication.isAuthenticated to true if 200 received */
        response: function (response) {
            if (response != null && response.status == 200 && $window.sessionStorage.token && !AuthenticationService.isLogged) {               
                AuthenticationService.isLogged = true;
            }
            return response || $q.when(response);
        },
 
        /* Revoke client authentication if 401 is received */
        responseError: function(rejection) {
            if (rejection != null && rejection.status === 401 && ($window.sessionStorage.token || AuthenticationService.isLogged)) {
                delete $window.sessionStorage.token;
                AuthenticationService.isLogged = false;
                
                $location.path("/message/1");
            }
 
            return $q.reject(rejection);
        }
    };
});
