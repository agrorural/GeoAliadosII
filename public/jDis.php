<?php

/*

    USO:

    GeojsonDistritos.php?deps=&provs=&dis= -> Todos Los Distritos
    GeojsonDistritos.php?deps=01&provs=&dis= -> Todos Los Distritos del Departamento con id 01
    GeojsonDistritos.php?deps=&provs=0102&dis= -> Todos Los Distritos de la provincia con id 0102
    GeojsonDistritos.php?deps=&provs=&dis=010102 -> Distrito con el id 010102

    NOTA: se pueden agregar mas Ids concatenando con comas (01,02,etc)

    OJO: Para el listado de todos los distritos se debe aumentar el limite de memoria del PHP


*/

//error_reporting(E_ALL);
//ini_set("display_errors", 1);
ini_set('memory_limit', '-1');

if (isset($_SERVER['HTTP_ORIGIN'])) {  
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");  
    header('Access-Control-Allow-Credentials: true');  
    header('Access-Control-Max-Age: 86400');   
}  
  
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {  
  
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))  
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");  
  
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))  
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");  
}

$url = 'http://qa.agrorural.gob.pe/WebAPI_GeoAgro/api/geo/ListarDistritos';
$data = trim($_GET['deps']);
$data = stripslashes($data);
$data = htmlspecialchars($data);
$Departamentos_ids = $data;
$data = trim($_GET['provs']);
$data = stripslashes($data);
$data = htmlspecialchars($data);
$Provincias_ids = $data;
$data = trim($_GET['dis']);
$data = stripslashes($data);
$data = htmlspecialchars($data);
$Distritos_ids = $data;

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL,            $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );
curl_setopt($ch, CURLOPT_POST,           1 );
curl_setopt($ch, CURLOPT_POSTFIELDS,     "{ID_DEP:'".$Departamentos_ids."',ID_PROV:'".$Provincias_ids."',ID_DIS:'".$Distritos_ids."'}"); 
curl_setopt($ch, CURLOPT_HTTPHEADER,     array('Content-Type: application/json')); 

$result=curl_exec ($ch);

$object = json_decode ($result);

//print_r($object);
echo '{"type":"FeatureCollection","crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:OGC:1.3:CRS84"}},"features":[';

for ($x = 0; $x < COUNT($object); $x++) {
	echo '{"type":"Feature","properties":{"NOM_DIS":"'.$object[$x]->NOM_PROV.'","ID_DIS":"'.$object[$x]->ID_PROV.'"},';
    echo $object[$x]->JSON;
    echo '}';
    if($x <> (COUNT($object)-1)){
    	echo ',';
    }
}

echo ']}';

?>