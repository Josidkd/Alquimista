var alquimiaApp = angular.module("alquimiaApp", []);
/* SECCIÓN MIS RECETAS */
alquimiaApp.controller("alquimiaCtrl", function ($scope){
	$scope.baseP = 90;

	$scope.resetear = function(){
		localStorage.clear();
		alert("Han sido borrados todos los datos de la APP");
	}
	$scope.guardar = function(){
		var receta="";
		$scope.aromaP = 100-$scope.baseP;
		//Creación de la receta en JSON
		receta='{"nombre":"'+$scope.nombre+'" ';
		receta=receta+', "base":"'+$scope.baseP+'" ';
		receta=receta+', "aroma":"'+$scope.aromaP+'" ';
		if($scope.aromaNom1 == undefined){
			receta=receta+', "aroma1N":"" , "aroma1C": 0 ';
		}else{
			receta=receta+', "aroma1N":"'+$scope.aromaNom1+'" , "aroma1C": '+$scope.aromaCant1+' ';
		}
		if($scope.aromaNom2 == undefined){
			receta=receta+', "aroma2N":"" , "aroma2C": 0 ';
		}else{
			receta=receta+', "aroma2N":"'+$scope.aromaNom2+'" , "aroma2C": '+$scope.aromaCant2+' ';
		}
		if($scope.aromaNom3 == undefined){
			receta=receta+', "aroma3N":"" , "aroma3C": 0 ';
		}else{
			receta=receta+', "aroma3N":"'+$scope.aromaNom3+'" , "aroma3C": '+$scope.aromaCant3+' ';
		}
		if($scope.moleculaNom == undefined){
			receta=receta+', "moleculaN":"" , "moleculaC": 0 ';
		}else{
			receta=receta+', "moleculaN":"'+$scope.moleculaNom+'" , "moleculaC": '+$scope.moleculaCant+' ';
		}
		receta=receta+', "maceracion":"'+$scope.maceracionT+'" ';
		receta=receta+"}";
		//alert("Receta creada: "+receta);
		//Guardado JSON
		var numeroRecetas = localStorage.getItem('numeroRecetas') || '<empty>';
		if(numeroRecetas == "<empty>"){
			//alert("No hay recetas");
			localStorage.setItem("numeroRecetas", 0);
		}//si no hay recetas guardadas inicializa a 0
		numeroRecetas = parseInt(localStorage.getItem('numeroRecetas'))+1; //recupera numero recetas
		localStorage.setItem("numeroRecetas", numeroRecetas);//actualiza numero de recetas
		localStorage.setItem($scope.nombre, receta);//guarda la receta en una variable con su nombre
		//alert("RecetasGuardadas "+numeroRecetas);
		alert("Receta guardada");
		location.href='misRecetas.html'; //Redirecciona a misRecetas al guardar
	}
	$scope.cancelar = function(){
		location.href='misRecetas.html'; //Redirecciona a misRecetas al cancelar
	}
});
alquimiaApp.controller("cargaRecetasCtrl", function ($scope){
	/*Carga de las recetas*/
	$scope.arrayRecetas = [];
	var numeroRecetas = parseInt(localStorage.getItem('numeroRecetas'));
	var x = 0;
	/* Carga todas las recetas almacenadas en localStorage */
	for(var i = 0 ; i <= numeroRecetas ; i++){
		var clave = localStorage.key(i);
		var recetaN=JSON.parse(localStorage.getItem(clave));
		var nombreClave = recetaN.nombre;
		if(nombreClave != undefined){
			var receta=JSON.parse(localStorage.getItem(nombreClave));
			$scope.nReceta1=receta.nombre;
			$scope.arrayRecetas[x]=receta;
			x++;
		}
	}
	/* Carga de una receta */
	var url=window.location.href;
	var parametros = url.lastIndexOf("?"); 
	var receta=url.substr(parametros+1);
	for(i=0 ; i<numeroRecetas; i++){
		var recetaBuscada = receta.replace(/%20/gi, " "); 
		if(recetaBuscada == $scope.arrayRecetas[i].nombre){
			$scope.nombre=$scope.arrayRecetas[i].nombre
			$scope.base = $scope.arrayRecetas[i].base;
			$scope.aroma = $scope.arrayRecetas[i].aroma;
            $scope.aroma1C = $scope.arrayRecetas[i].aroma1C;
            $scope.aroma1N = $scope.arrayRecetas[i].aroma1N;
            $scope.aroma2C = $scope.arrayRecetas[i].aroma2C;
            $scope.aroma2N = $scope.arrayRecetas[i].aroma2N;
            $scope.aroma3C = $scope.arrayRecetas[i].aroma3C;
            $scope.aroma3N = $scope.arrayRecetas[i].aroma3N;
            $scope.moleculaC = $scope.arrayRecetas[i].moleculaC;
            $scope.moleculaN = $scope.arrayRecetas[i].moleculaN;
            $scope.maceracionT = $scope.arrayRecetas[i].maceracion;
		}
	}
	$scope.borrar = function(){
		for (x=0; x<=localStorage.length-1; x++){
			var clave = localStorage.key(x);
			var receta=JSON.parse(localStorage.getItem(clave));
			var nombreClave = receta.nombre;
			if( nombreClave == recetaBuscada){
				localStorage.removeItem(clave);
				numeroRecetas = parseInt(localStorage.getItem('numeroRecetas'))-1; //recupera numero recetas
				localStorage.setItem("numeroRecetas", numeroRecetas);//actualiza numero de recetas
				alert("La receta "+recetaBuscada+" ha sido borrada");
				location.href='misRecetas.html'; //redirecciona a misRecetas despues de borrar
			}
		} // busca en todas las variables de localStorage la que tiene que borrar
	}
	$scope.index = function(){
		location.href='index.html'; //Redirecciona a misRecetas al cancelar
	}
});
alquimiaApp.controller("editaRecetasCtrl", function ($scope){
	$scope.arrayRecetas = [];
	var numeroRecetas = parseInt(localStorage.getItem('numeroRecetas'));
	var x = 0;
	/* Carga todas las recetas almacenadas en localStorage */
	for(var i = 0 ; i <= numeroRecetas ; i++){
		var clave = localStorage.key(i);
		var recetaN=JSON.parse(localStorage.getItem(clave));
		var nombreClave = recetaN.nombre;
		if(nombreClave != undefined){
			var receta=JSON.parse(localStorage.getItem(nombreClave));
			$scope.nReceta1=receta.nombre;
			$scope.arrayRecetas[x]=receta;
			x++;
		}
	}
	var url=window.location.href;
	var parametros = url.lastIndexOf("?"); 
	var receta=url.substr(parametros+1);
	for(i=0 ; i<numeroRecetas; i++){
		var recetaBuscada = receta.replace(/%20/gi, " "); 
		if(recetaBuscada == $scope.arrayRecetas[i].nombre){
			$scope.nombre=$scope.arrayRecetas[i].nombre
			$scope.baseP = $scope.arrayRecetas[i].base;
			$scope.aromaP = $scope.arrayRecetas[i].aroma;
            $scope.aromaCant1 = $scope.arrayRecetas[i].aroma1C;
            $scope.aromaNom1 = $scope.arrayRecetas[i].aroma1N;
            $scope.aromaCant2 = $scope.arrayRecetas[i].aroma2C;
            $scope.aromaNom2 = $scope.arrayRecetas[i].aroma2N;
            $scope.aromaCant3 = $scope.arrayRecetas[i].aroma3C;
            $scope.aromaNom3 = $scope.arrayRecetas[i].aroma3N;
            $scope.moleculaCant = $scope.arrayRecetas[i].moleculaC;
            $scope.moleculaNom = $scope.arrayRecetas[i].moleculaN;
            $scope.maceracionT = $scope.arrayRecetas[i].maceracion;
		}
	}
	document.getElementById("base").value = parseInt($scope.baseP);
	document.getElementById("tiempoMaceracion").value = parseInt($scope.maceracionT);
	$scope.guardar = function(){
		var receta="";
		$scope.aromaP = 100-$scope.baseP;
		//Creación de la receta en JSON
		receta='{"nombre":"'+$scope.nombre+'" ';
		receta=receta+', "base":"'+$scope.baseP+'" ';
		receta=receta+', "aroma":"'+$scope.aromaP+'" ';
		if($scope.aromaNom1 == undefined){
			receta=receta+', "aroma1N":"" , "aroma1C": 0 ';
		}else{
			receta=receta+', "aroma1N":"'+$scope.aromaNom1+'" , "aroma1C": '+$scope.aromaCant1+' ';
		}
		if($scope.aromaNom2 == undefined){
			receta=receta+', "aroma2N":"" , "aroma2C": 0 ';
		}else{
			receta=receta+', "aroma2N":"'+$scope.aromaNom2+'" , "aroma2C": '+$scope.aromaCant2+' ';
		}
		if($scope.aromaNom3 == undefined){
			receta=receta+', "aroma3N":"" , "aroma3C": 0 ';
		}else{
			receta=receta+', "aroma3N":"'+$scope.aromaNom3+'" , "aroma3C": '+$scope.aromaCant3+' ';
		}
		if($scope.moleculaNom == undefined){
			receta=receta+', "moleculaN":"" , "moleculaC": 0 ';
		}else{
			receta=receta+', "moleculaN":"'+$scope.moleculaNom+'" , "moleculaC": '+$scope.moleculaCant+' ';
		}
		receta=receta+', "maceracion":"'+$scope.maceracionT+'" ';
		receta=receta+"}";
		alert("La receta '"+$scope.nombre+"' ha sido editada");
		localStorage.removeItem(recetaBuscada);
		localStorage.setItem($scope.nombre, receta);
		location.href='misRecetas.html'; //Redirecciona a misRecetas al editar
	}
	$scope.cancelar = function(){
		location.href='misRecetas.html'; //Redirecciona a misRecetas al cancelar
	}
});
/* SECCIÓN MIS E-LIQUIDOS */
alquimiaApp.controller("creaCtrl", function ($scope){

	$scope.vTabla=false; //Hace invisible la tabla antes de cargar datos

	$scope.arrayRecetas = [];
	var numeroRecetas = parseInt(localStorage.getItem('numeroRecetas'));
	var x = 0;
	/* Carga todas las recetas almacenadas en localStorage */
	for(var i = 0 ; i <= numeroRecetas ; i++){
		var clave = localStorage.key(i);
		var recetaN=JSON.parse(localStorage.getItem(clave));
		var nombreClave = recetaN.nombre;
		if(nombreClave != undefined){
			var receta=JSON.parse(localStorage.getItem(nombreClave));
			$scope.nReceta1=receta.nombre;
			$scope.arrayRecetas[x]=receta;
			x++;
		}
	}
	$scope.cargaProporcion = function(){
		$scope.vTabla=true; //Hace visible la tabla al cargar datos
		if($scope.recetaSelect == null){
			$scope.vTabla = false;
		}
		
		for(i=0 ; i<numeroRecetas; i++){
			if($scope.recetaSelect == $scope.arrayRecetas[i].nombre){
				//alert("bote de "+$scope.envase+" ml");
				$scope.baseP = $scope.arrayRecetas[i].base;
				$scope.baseMl = ($scope.envase*$scope.baseP)/100;

	            $scope.aromaNom1 = $scope.arrayRecetas[i].aroma1N;
	            $scope.aromaCant1 = $scope.arrayRecetas[i].aroma1C;
	            $scope.aromaCantMl1 = ($scope.envase*$scope.aromaCant1)/100;
	            
	            $scope.aromaNom2 = $scope.arrayRecetas[i].aroma2N;
	            $scope.aromaCant2 = $scope.arrayRecetas[i].aroma2C;
	            $scope.aromaCantMl2 = ($scope.envase*$scope.aromaCant2)/100;
	            
	            $scope.aromaNom3 = $scope.arrayRecetas[i].aroma3N;
	            $scope.aromaCant3 = $scope.arrayRecetas[i].aroma3C;
	            $scope.aromaCantMl3 = ($scope.envase*$scope.aromaCant3)/100;

	            $scope.moleculaCant = $scope.arrayRecetas[i].moleculaC;
	            $scope.moleculaNom = $scope.arrayRecetas[i].moleculaN;

	            $scope.maceracionT = $scope.arrayRecetas[i].maceracion;
			}
		}

	}
	
});