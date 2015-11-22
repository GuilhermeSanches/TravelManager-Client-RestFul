var App = angular.module('controllers', []);
  

App.controller('MenuCtrl', function($scope, $route, $location){
 
    
});

App.controller('LancamentoCtrl', function($scope,$rootScope,Viagens,Categorias, $window, $routeParams, $route, $location){
    var id = $routeParams.id;
    var idViagem = $routeParams.idViagem;
        $scope.categorias = [];

        Categorias.read().then(function(result){
          $scope.categorias=result.data;
        
        });
    
        $('#mLancamento').modal('show');    

        $('#mLancamento').on('hide.bs.modal', function(){    
                  $(window.document.location).attr('href',"#/");          
        });
    
        $scope.newLancamento = function(){
            
             $(window.document.location).attr('href','#/'+id+'/lancamento/add');   
//            href="#/lancamento/add"
        };
        
    
        $scope.lancamentos = [];        
            Viagens.readLancamento(id).then(function(data){                            
                $scope.lancamentos = data.data;            
            },function(data){
                $location.path('/');            
            });
    
        $scope.addLancamento = function(newLancamento){
        
        Viagens.createLancamento(idViagem, newLancamento).then(function(result){
            
                $('#mLancamento').modal('hide');
                alert("Lançamento com sucesso");
                $(window.document.location).attr('href',"#/");   
                $route.reload();        
        });
    
    };
    
    $scope.deletar = function(item){            
		Viagens.deleteLancamento(id, item).then(function(data){			
			$route.reload();
		});	
                
        };
    
});


App.controller('MessagesCtrl', function($scope, Messages, $route, $location, $routeParams){
    $('#myModal').modal('show');
    var mensagem = $routeParams.id;     
    Messages.readMessage(mensagem).then(function(data){         
		$scope.message = data.data.description;        	
    });
    
    
    
   $('#myModal').on('hide.bs.modal', function(){       
      $(window.document.location).attr('href',"#/");          
})
    
});

App.controller('ReadCtrl', function($scope,$location,$route, Viagens, $route){
	$scope.viagens = [];
    
        $('#exampleModal').modal('show');    

        $('#exampleModal').on('hide.bs.modal', function(){    
                  $(window.document.location).attr('href',"#/");          
        });
    
    
        $scope.getUrl = function(){
            if($route.current.loadedTemplateUrl==='views/lancamento.html')
                return false;
            else return true;
        };
        
        $scope.addViagem = function(obj){
            var token = {token: sessionStorage.token};
            
            var props = Object.keys(token);
 
 
            for (var i = 0; i < props.length; i++) {
                obj[props[i]] = token[props[i]];
            }

            
        
        Viagens.create(obj).success(function(data){
                $('#exampleModal').modal('hide');
                alert("cadastrado com sucesso");
                $(window.document.location).attr('href',"#/");               
		  });        
        };
    
        $scope.itemIcon = function(item){
            if(item.status===1) return'glyphicon glyphicon-ok';
            else  return 'glyphicon glyphicon-remove';
        }
        
        $scope.getSaldo = function(item){
            if(item.vGasto > item.vPrevisto)
                    return 'saldoDevedor';
            else return 'saldoOk';
        };
    
    
    
      $( "#img" ).show("slow");
      $( "#maps" ).show("slow");
      $( "#openMap").slideUp();
      $( "#tops" ).show("slow");
    
    $("#tops").click(function() { 
       $("#img").slideUp();
       $("#maps").slideUp();
       $( "#openMap").show("slow");
        });
    
                            
    $("#img2").click(function(){ 
      $("#img").show( "slow" );
      $("#maps").show( "slow" );
      $("#openMap").slideUp();  
});
    
    
	$scope.notFound = false;
    
    
	Viagens.read().then(function(data){
        
        
		$scope.viagens = data.data;

                
        /*logica verificar data do dia e data da viagem */
        if(1){
        navigator.geolocation.getCurrentPosition(function(sucess){
                    var crd_lat = parseFloat(sucess.coords.latitude).toFixed(7);
                    var crd_lng = parseFloat(sucess.coords.longitude).toFixed(7);
            
                initMap(parseFloat(crd_lat), parseFloat(crd_lng));
        });
        }else{
                    
                    var crd_lat = data.data[0].latitude;
                    var crd_lng = data.data[0].longitude;
                initMap(crd_lat, crd_lng);
        }
        
	},function(data){
        $location.path('/login');
		console.log("data", data);
	});

    
    
	$scope.deletar = function(id){
		Viagens.delete(id).then(function(data){
			console.log(data);
			$route.reload();
		});	
	}
    
    
    
});	

App.controller('ReadCtrlTravel', function($scope,$location, Viagem, $route){
	$scope.viagens = [];
    
  
      $( "#img" ).slideUp();
      $( "#maps" ).slideUp();
      $( "#openMap" ).slideUp();
      $( "#tops" ).slideUp();
  
    
     

	$scope.notFound = false;
	Viagem.read().then(function(data){
		$scope.viagens = data.data;
		if(data == undefined){
			$scope.notFound = true;
		}
	},function(data){
        $location.path("/login");
		console.log("data", data);
	});
;
    
    
    
	$scope.delet_travel = function(id){
		Viagem.delete(id).then(function(data){
			console.log(data);
			$route.reload();
		});	
	}

});

App.controller('CreateCtrl', function($scope, Viagens,$route, $location){
	$scope.cadastrar = function(titulo){
		var data = {
			titulo: titulo
		};

		Viagens.create(data).then(function(data){
			$location.path('/viagens');
            $route.reload();
		});
	}
});	

App.controller('EditCtrl', function($scope, Viagens,Viagens,  $routeParams, $location){
	var id = $routeParams.id;
    

    
    $('#modalEditTravel').modal('show');    

        $('#modalEditTravel').on('hide.bs.modal', function(){    
                  $(window.document.location).attr('href',"#/");          
        });
    
    
    
	Viagens.profile(id).then(function(data){
		$scope.item = data.data;
        $route.reload();
        
	})

	$scope.atualizar = function(item){
		console.log(item);
		Viagens.update(item, item.id_viagem).then(function(data){
			  $('#modalEditTravel').modal('hide');
                alert("Editado com sucesso");
                $(window.document.location).attr('href',"#/");         
		});
	}
});	


App.controller('EditTravelCtrl', function($scope, Viagem, $route, $routeParams, $location){
	var id = $routeParams.id;
    
   
    
	Viagem.profile(id).then(function(data){
		$scope.item = data.data;                
	})

	$scope.atualizar = function(item){
		console.log(item);
		Viagem.update(item, item.id_travel).then(function(data){
			$location.path('/viagens');
		});
	}
});	


App.controller('controllerSignUp', function($scope, Login, Viagem, $route, $routeParams, $location){
	$scope.loginFb = function(){

        Login.read().then(function(data){
		$scope.dados = data.data;
       
		if(data.data.length == 0){
			$scope.notFound = true;
		}
	},function(data){
		console.log("data", data);
	});
    
    };
});	


App.controller('AdminUserCtrl', ['$scope', '$location', '$window', 'UserService', 'AuthenticationService',
    function AdminUserCtrl($scope, $location, $window, UserService, AuthenticationService) {
 
        
        $scope.signup = function(){
            $location.path('/signup');
        
        };
        
        //Admin User Controller (login, logout)
        $scope.logIn = function logIn(username, password) {
            if (username !== undefined && password !== undefined) {
 
                UserService.logIn(username, password).success(function(data) {
                
                    
                    AuthenticationService.isLogged = true;
                    $window.sessionStorage.token = data.token; 
                    $window.localStorage.isLogado = true;
                    $location.path("/");
                }).error(function(status, data) {
                    console.log(JSON.stringify(data));
                    $location.path("/message/1");
                    
                                                            
                });
            }
        }
 
        $scope.logout = function logout() {
            if (AuthenticationService.isLogged) {
                AuthenticationService.isLogged = false;
                delete $window.sessionStorage.token;
                delete $window.localStorage.isLogado;
                $location.path("/login");
            }
        }
    }
]);
 