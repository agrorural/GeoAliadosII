<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class GeoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Display a listing of departamentos.
     *
     * @return \Illuminate\Http\Response
     */
    public function getDepartamentos()
    {
        
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

        $url = 'http://qa.agrorural.gob.pe/WebAPI_GeoAgro/api/geo/ListarDepartamentos';
        $data = trim($_GET['deps']);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        $ids = $data;

        $ch = curl_init();

        curl_setopt($ch, CURLOPT_URL,            $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1 );
        curl_setopt($ch, CURLOPT_POST,           1 );
        curl_setopt($ch, CURLOPT_POSTFIELDS,     "{ID_DEP:'".$ids."'}"); 
        curl_setopt($ch, CURLOPT_HTTPHEADER,     array('Content-Type: application/json')); 

        $result=curl_exec ($ch);

        $object = json_decode ($result);

        //print_r($object);
        echo '{"type":"FeatureCollection","crs":{"type":"name","properties":{"name":"urn:ogc:def:crs:OGC:1.3:CRS84"}},"features":[';

        for ($x = 0; $x < COUNT($object); $x++) {
            echo '{"type":"Feature","properties":{"NOMBDEP":"'.$object[$x]->NOM_DEP.'","ID_DEP":"'.$object[$x]->ID_DEP.'"},';
            echo $object[$x]->JSON;
            echo '}';
            if($x <> (COUNT($object)-1)){
                echo ',';
            }
        }

        echo ']}';
    }

    /**
     * Display a listing of provincias.
     *
     * @return \Illuminate\Http\Response
     */
    public function getProvincias()
    {
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
    }

    /**
     * Display a listing of distritos.
     *
     * @return \Illuminate\Http\Response
     */
    public function getDistritos()
    {
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
            echo '{"type":"Feature","properties":{"NOM_DIS":"'.$object[$x]->NOM_DIS.'","ID_DIS":"'.$object[$x]->ID_DIS.'"},';
            echo $object[$x]->JSON;
            echo '}';
            if($x <> (COUNT($object)-1)){
                echo ',';
            }
        }

        echo ']}';
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
