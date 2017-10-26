<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/departamentos', 'GeoController@getDepartamentos');

Route::get('/provincias', 'GeoController@getProvincias');

Route::get('/distritos', 'GeoController@getDistritos');

Route::get('/cp', 'GeoController@getCP');
