<?php

/*

    USO:

    GeojsonProvincias.php?deps=&provs= -> Todas Las Provincias
    GeojsonProvincias.php?deps=&provs=0105 -> La Provincia con Id 0105
    GeojsonProvincias.php?deps=&provs=0105,0107 -> Las Provincias con Id 0105,0107
    GeojsonProvincias.php?deps=04&provs= -> Todas Las Provincias del Departamento con Id 04 (Se pueden agregar mas)
    GeojsonProvincias.php?deps=04,05&provs= -> Todas Las Provincias de lo Departamentos con Id 04 y 05 (Se pueden agregar mas)



*/

//error_reporting(E_ALL);
//ini_set("display_errors", 1);

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

$url = 'http://qa.agrorural.gob.pe/WebAPI_GeoAgro/api/geo/ListarProvincias';
$data = trim($_GET['deps']);
$data = stripslashes($data);
$data = htmlspecialchars($data);
$Departamentos_ids = $data;
$data = trim($_GET['provs']);
$data = stripslashes($data);
$data = htmlspecialchars($data);
$Provincias_ids = $data;

$ch = curl_init();

curl_setopt($ch, CURLOPT_URL,            $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );
curl_setopt($ch, CURLOPT_POST,           1 );
curl_setopt($ch, CURLOPT_POSTFIELDS,     "{ID_DEP:'".$Departamentos_ids."',ID_PROV:'".$Provincias_ids."'}"); 
curl_setopt($ch, CURLOPT_HTTPHEADER,     array('Content-Type: application/json')); 

$result=curl_exec ($ch);

$object = json_decode ($result);

//print_r($object);
echo '{"type":"FeatureCollection","crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:OGC:1.3:CRS84"}},"features":[';

for ($x = 0; $x < COUNT($object); $x++) {
	echo '{"type":"Feature","properties":{"NOM_PROV":"'.$object[$x]->NOM_PROV.'","ID_PROV":"'.$object[$x]->ID_PROV.'"},';
    echo $object[$x]->JSON;
    echo '}';
    if($x <> (COUNT($object)-1)){
    	echo ',';
    }
}

echo ']}';

?>