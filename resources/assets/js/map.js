let tipoMapa = 1;
let map;
let aliadosDepID = '03,05,09,10,12,19';
let deno = '';
let depID = '';
let proID = '';
let disID = '';


function initialState(){
  $('.spinner-wrapper').show();
  $(".chart__table").html('');
  $(".chart__image").html('');
}

initialState();

function loadState(){
    $('.spinner-wrapper').hide();
}

function numberWithCommas(x) {
    var parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}

map = new google.maps.Map(document.getElementById('map'), {
  zoom: 8,
  center: {lat: -12.079652, lng: -77.042575},
  styles: [
        {elementType: 'geometry', stylers: [{color: '#f5f1e6'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
        {
          featureType: 'administrative',
          elementType: 'geometry.stroke',
          stylers: [{color: '#656366'}]
        },
        {
          featureType: 'administrative.land_parcel',
          elementType: 'geometry.stroke',
          stylers: [{color: '#f5f1e6'}]
        },
        {
          featureType: 'administrative.land_parcel',
          elementType: 'labels.text.fill',
          stylers: [{color: '#ae9e90'}]
        },
        {
          featureType: 'landscape.natural',
          elementType: 'geometry',
          stylers: [{color: '#eaebed'}]
        },
        {
          featureType: 'poi',
          elementType: 'geometry',
          stylers: [{color: '#eaebed'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#93817c'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry.fill',
          stylers: [{color: '#cbdaaf'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#447530'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#f5f1e6'}]
        },
        {
          featureType: 'road.arterial',
          elementType: 'geometry',
          stylers: [{color: '#fdfcf8'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#cbdaaf'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#b3c8aa'}]
        },
        {
          featureType: 'road.highway.controlled_access',
          elementType: 'geometry',
          stylers: [{color: '#f5f1e6'}]
        },
        {
          featureType: 'road.highway.controlled_access',
          elementType: 'geometry.stroke',
          stylers: [{color: '#b3c8aa'}]
        },
        {
          featureType: 'road.local',
          elementType: 'labels.text.fill',
          stylers: [{color: '#806b63'}]
        },
        {
          featureType: 'transit.line',
          elementType: 'geometry',
          stylers: [{color: '#d7d8dc'}]
        },
        {
          featureType: 'transit.line',
          elementType: 'labels.text.fill',
          stylers: [{color: '#8f7d77'}]
        },
        {
          featureType: 'transit.line',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#ebe3cd'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'geometry',
          stylers: [{color: '#d7d8dc'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry.fill',
          stylers: [{color: '#ccdfe6'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#92998d'}]
        }
      ]
});

let capaDepartamentos = new google.maps.Data();
let capaProvincias = new google.maps.Data();
let capaDistritos = new google.maps.Data();
let capaCP = new google.maps.Data();

function showDepartamentos(deno){
  //cleanForm('all');
  $("#ddlDistrito").empty();
  $("#ddlDistrito").append("<option value='00' disabled selected>Seleccione</option>");
  $("#ddlProvincia").empty();
  $("#ddlProvincia").append("<option value='00' disabled selected>Seleccione</option>");
  initialState();

  depID = '00';

  $("#ddlDepartamento option").each(function(){
    if($(this).val() === depID){
      $(this).attr('selected', true);    
    }else{
      $(this).attr('selected', false);
    }
  });

  capaDepartamentos.forEach(function (feature) {
    capaDepartamentos.remove(feature);
  });

  capaProvincias.forEach(function (feature) {
    capaProvincias.remove(feature);
  });

  capaDistritos.forEach(function (feature) {
    capaDistritos.remove(feature);
  });

  capaCP.forEach(function (feature) {
    capaCP.remove(feature);
  });

  capaDepartamentos.loadGeoJson('/departamentos?deps=' + aliadosDepID + '&provs=&deno=' + deno, null, function(event){
    //console.log(event);
    $(".chart__table").html(`
      <div class="page-header"><h3>Departamentos</h3></div>
      <table id="tblDep" class="table table-striped table-bordered table-hover table-responsive table-condensed">
        <thead class="thead-dark">
        </thead>
        <tbody>
        </tbody>
      </table>
    `);

    $(".chart__image").html(`
      <div class="page-header"><h3>Planes</h3></div>
      <div id="chartDep" style="height:450px"></div>
    `);

    let tableData = [];
    let chartMultiData = [];

    $(".chart__table").find("table thead").append(`
      <tr>
        <th rowspan="2">ID</th>
        <th rowspan="2">Departamento</th>
        <th colspan="2">PDN</th>
        <th colspan="2">PDNC</th>
        <th colspan="2">PDT</th>
      </tr>
      <tr>
        <th scope="col">Nº</th>
        <th scope="col">Inversión</th>
        <th scope="col">Nº</th>
        <th scope="col">Inversión</th>
        <th scope="col">Nº</th>
        <th scope="col">Inversión</th>
      </tr>
    `);
    
    event.forEach(function(feature){
      tableData.push([feature.f.ID_DEP, feature.f.NOMBDEP, feature.f.Nro_pdn, 'S/. ' + numberWithCommas(feature.f.Inversion_pdn), feature.f.Nro_pdnc, 'S/. ' + numberWithCommas(feature.f.Inversion_pdnc), feature.f.Nro_pdt, 'S/. ' + numberWithCommas(feature.f.Inversion_pdt)]);
      chartMultiData.push({name: feature.f.NOMBDEP, data: {"PDN": parseInt(feature.f.Nro_pdn), "PDNC": parseInt(feature.f.Nro_pdnc), "PDT": parseInt(feature.f.Nro_pdt)}});
      //console.log(numberWithCommas(feature.f.Inversion_pdn));
    });

    $(function() {
      loadState();
      
      $('#tblDep').DataTable( {
        "fnCreatedRow": function( nRow, aData, iDataIndex ) {
            $(nRow).attr('id', aData[0]);
        }, 
          data: tableData,
          "columnDefs": [ {
            "targets": 0,
            "visible": false
          } ]
      } );

      new Chartkick.ColumnChart("chartDep", chartMultiData, {legend: "bottom"});

      let chartHeight= $('.chart').height()
      $('#map').height(chartHeight);
      console.log(chartHeight);
    });

    //console.log(tableData);

  });

  capaDepartamentos.setStyle({
    strokeColor: 'red',
    fillColor: 'red',
    strokeWeight: 1
  });

  capaDepartamentos.addListener('mouseover', function(event) {
    capaDepartamentos.revertStyle();
    capaDepartamentos.overrideStyle(event.feature, {fillColor:'#5a92a1',strokeColor:'#5a92a1',strokeWeight: 1});

    $(".chart__table").find("table tbody tr#" + event.feature.getProperty('ID_DEP') ).addClass('success');

    //console.log(IDI_DEP);

  });

  capaDepartamentos.addListener('mouseout', function(event) {
    capaDepartamentos.revertStyle();
    $(".chart__table").find("table tbody tr").removeClass('success');
  });

  capaDepartamentos.setMap(map);
  map.setZoom(7);

}

function showProvincias(id, deno){

  capaDepartamentos.forEach(function (feature) {
    capaDepartamentos.remove(feature);
  });

  capaProvincias.forEach(function (feature) {
    capaProvincias.remove(feature);
  });

  capaDistritos.forEach(function (feature) {
    capaDistritos.remove(feature);
  });

  capaCP.forEach(function (feature) {
    capaCP.remove(feature);
  });

  $("#ddlDepartamento option").each(function(){
    if($(this).val() === id){
      $(this).attr('selected', true);
      //console.log(id);    
    }else{
      $(this).attr('selected', false);
    }
  });

  capaProvincias.loadGeoJson('/provincias?deps=' + id + '&provs=&deno=' + deno, null, function(event){
    //console.log(event);
    $(".chart__table").html(`
      <div class="page-header"><h3>Provincias</h3></div>
      <table id="tblProv" class="table table-striped table-bordered table-hover table-responsive table-condensed">
        <thead class="thead-dark">
        </thead>
        <tbody>
        </tbody>
      </table>
    `);

    $(".chart__image").html(`
      <div class="page-header"><h3>Planes</h3></div>
      <div id="chartProv" style="height:450px"></div>
    `);

    let tableData = [];
    let chartMultiData = [];

    $(".chart__table").find("table thead").append(`
      <tr>
        <th rowspan="2">ID</th>
        <th rowspan="2">Provincia</th>
        <th colspan="2">PDN</th>
        <th colspan="2">PDNC</th>
        <th colspan="2">PDT</th>
      </tr>
      <tr>
        <th scope="col">Nº</th>
        <th scope="col">Inversión</th>
        <th scope="col">Nº</th>
        <th scope="col">Inversión</th>
        <th scope="col">Nº</th>
        <th scope="col">Inversión</th>
      </tr>
    `);
    
    event.forEach(function(feature){
      tableData.push([feature.f.ID_PROV, feature.f.NOM_PROV, feature.f.Nro_pdn, 'S/. ' + numberWithCommas(feature.f.Inversion_pdn), feature.f.Nro_pdnc, 'S/. ' + numberWithCommas(feature.f.Inversion_pdnc), feature.f.Nro_pdt, 'S/. ' + numberWithCommas(feature.f.Inversion_pdt)]);
      chartMultiData.push({name: feature.f.NOM_PROV, data: {"PDN": parseInt(feature.f.Nro_pdn), "PDNC": parseInt(feature.f.Nro_pdnc), "PDT": parseInt(feature.f.Nro_pdt)}});
      //console.log(numberWithCommas(feature.f.Inversion_pdn));
    });

    $(function() {
      loadState();
      
      $('#tblProv').DataTable( {
        "fnCreatedRow": function( nRow, aData, iDataIndex ) {
            $(nRow).attr('id', aData[0]);
        }, 
          data: tableData,
          "columnDefs": [ {
            "targets": 0,
            "visible": false
          } ]
      } );

      new Chartkick.ColumnChart("chartProv", chartMultiData, {legend: "bottom"});

      let chartHeight= $('.chart').height()
      $('#map').height(chartHeight);
      console.log(chartHeight);
    });

    //console.log(tableData);
  });

  capaProvincias.setMap(map);

  capaProvincias.setStyle({
    strokeColor: 'orange',
    fillColor: 'orange',
    strokeWeight: 1
  });

  capaProvincias.addListener('mouseover', function(event) {
    capaProvincias.revertStyle();
    capaProvincias.overrideStyle(event.feature, {fillColor:'#5a92a1',strokeColor:'#5a92a1',strokeWeight: 1});
    $(".chart__table").find("table tbody tr#" + event.feature.getProperty('ID_PROV') ).addClass('success');
  });

  capaProvincias.addListener('mouseout', function(event) {
    capaProvincias.revertStyle();
    $(".chart__table").find("table tbody tr").removeClass('success');
  });

  capaProvincias.addListener('addfeature', function(event) {
    let bounds = new google.maps.LatLngBounds();
    processPoints(event.feature.getGeometry(), bounds.extend, bounds);
    map.fitBounds(bounds);
    map.setZoom(8);
  });

  cleanForm('dep');
}

function showDistritos(id, deno){
  capaDepartamentos.forEach(function (feature) {
    capaDepartamentos.remove(feature);
  });

  capaProvincias.forEach(function (feature) {
    capaProvincias.remove(feature);
  });

  capaDistritos.forEach(function (feature) {
    capaDistritos.remove(feature);
  });

  capaCP.forEach(function (feature) {
    capaCP.remove(feature);
  });

  provID = id;

  $("#ddlProvincia option").each(function(){
    if($(this).val() === provID){
      $(this).attr('selected', true);    
    }else{
      $(this).attr('selected', false);
    }
  });

  capaDistritos.loadGeoJson('/distritos?deps=&provs=' + provID + '&dis=&deno=' + deno, null, function(event){    
    //console.log(event);
    $(".chart__table").html(`
      <div class="page-header"><h3>Distritos</h3></div>
      <table id="tblDis" class="table table-striped table-bordered table-hover table-responsive table-condensed">
        <thead class="thead-dark">
        </thead>
        <tbody>
        </tbody>
      </table>
    `);

    $(".chart__image").html(`
      <div class="page-header"><h3>Planes</h3></div>
      <div id="chartDis" style="height:450px"></div>
    `);

    let tableData = [];
    let chartMultiData = [];

    $(".chart__table").find("table thead").append(`
      <tr>
        <th rowspan="2">ID</th>
        <th rowspan="2">Distrito</th>
        <th colspan="2">PDN</th>
        <th colspan="2">PDNC</th>
        <th colspan="2">PDT</th>
      </tr>
      <tr>
        <th scope="col">Nº</th>
        <th scope="col">Inversión</th>
        <th scope="col">Nº</th>
        <th scope="col">Inversión</th>
        <th scope="col">Nº</th>
        <th scope="col">Inversión</th>
      </tr>
    `);
    
    event.forEach(function(feature){
      tableData.push([feature.f.ID_DIS, feature.f.NOM_DIS, feature.f.Nro_pdn, 'S/. ' + numberWithCommas(feature.f.Inversion_pdn), feature.f.Nro_pdnc, 'S/. ' + numberWithCommas(feature.f.Inversion_pdnc), feature.f.Nro_pdt, 'S/. ' + numberWithCommas(feature.f.Inversion_pdt)]);
      chartMultiData.push({name: feature.f.NOM_DIS, data: {"PDN": parseInt(feature.f.Nro_pdn), "PDNC": parseInt(feature.f.Nro_pdnc), "PDT": parseInt(feature.f.Nro_pdt)}});
      //console.log(numberWithCommas(feature.f.Inversion_pdn));
    });

    $(function() {
      loadState();
      
      $('#tblDis').DataTable( {
        "fnCreatedRow": function( nRow, aData, iDataIndex ) {
            $(nRow).attr('id', aData[0]);
        }, 
          data: tableData,
          "columnDefs": [ {
            "targets": 0,
            "visible": false
          } ]
      } );

      new Chartkick.ColumnChart("chartDis", chartMultiData, {legend: "bottom"});

      let chartHeight= $('.chart').height()
      $('#map').height(chartHeight);
      console.log(chartHeight);
    });

    //console.log(tableData);
  });

  capaDistritos.setMap(map);

  capaDistritos.setStyle({
    strokeColor: '#d3cc18',
    fillColor: '#d3cc18',
    strokeWeight: 1
  });

  capaDistritos.addListener('mouseover', function(event) {
    capaDistritos.revertStyle();
    capaDistritos.overrideStyle(event.feature, {fillColor:'#5a92a1',strokeColor:'#5a92a1',strokeWeight: 1});
    $(".chart__table").find("table tbody tr#" + event.feature.getProperty('ID_DIS') ).addClass('success');
  });

  capaDistritos.addListener('mouseout', function(event) {
    capaDistritos.revertStyle();
    $(".chart__table").find("table tbody tr").removeClass('success');
  });

  capaDistritos.addListener('addfeature', function(event) {
    let bounds = new google.maps.LatLngBounds();
    processPoints(event.feature.getGeometry(), bounds.extend, bounds);
    map.fitBounds(bounds);
    map.setZoom(9);
  });
}

function showCP(id, deno){
  disID = id;

  capaDepartamentos.forEach(function (feature) {
    capaDepartamentos.remove(feature);
  });

  capaProvincias.forEach(function (feature) {
    capaProvincias.remove(feature);
  });

  capaDistritos.forEach(function (feature) {
    capaDistritos.remove(feature);
  });

  capaCP.forEach(function (feature) {
    capaCP.remove(feature);
  });

  $("#ddlDistrito option").each(function(){
    if($(this).val() === disID){
      $(this).attr('selected', true);    
    }else{
      $(this).attr('selected', false);
    }
  });

  capaCP.loadGeoJson('/cp?deps=&provs=&dis=' + disID + '&ccpps=&deno=' + deno, null, function(event){    
    console.log(event);
    $(".chart__table").html(`
      <div class="page-header"><h3>Centro Poblado</h3></div>
      <table id="tblCP" class="table table-striped table-bordered table-hover table-responsive table-condensed" styler="height:930px">
        <thead class="thead-dark">
        </thead>
        <tbody>
        </tbody>
      </table>
    `);

    $(".chart__image").html(`
      <div class="page-header"><h3>Familias</h3></div>
      <div id="chartCP" style="height:450px"></div>
    `);

    let tableData = [];
    let chartMultiData = [];

    $(".chart__table").find("table thead").append(`
      <tr>
        <th>ID</th>
        <th>Demonimación</th>
        <th>Rubro</th>
        <th>Línea</th>
        <th>Familias</th>
        <th>Organización</th>
      </tr>
    `);
    let NRO_FAMILIAS_M = 0;
    let NRO_FAMILIAS_F = 0;
    let NRO_FAMILIAS = 0;
    event.forEach(function(feature){
      NRO_FAMILIAS_M += parseInt(feature.f.NRO_FAMILIAS_M);
      NRO_FAMILIAS_F += parseInt(feature.f.NRO_FAMILIAS_F);
      NRO_FAMILIAS += parseInt(feature.f.NRO_FAMILIAS);
      tableData.push([feature.f.CODCP, feature.f.DENOMINACION, feature.f.RUBRO, feature.f.LINEA_ESPECIFICA, feature.f.NRO_FAMILIAS, feature.f.ORGANIZACION]);
      
      //tableData.push([feature.f.CODCP, feature.f.NOMCP, feature.f.Nro_pdn, 'S/. ' + numberWithCommas(feature.f.Inversion_pdn), feature.f.Nro_pdnc, 'S/. ' + numberWithCommas(feature.f.Inversion_pdnc), feature.f.Nro_pdt, 'S/. ' + numberWithCommas(feature.f.Inversion_pdt)]);
      //console.log(numberWithCommas(feature.f.Inversion_pdn));
    });

    console.log(NRO_FAMILIAS_M);
    console.log(NRO_FAMILIAS_F);
    console.log(NRO_FAMILIAS);

    $(function() {
      loadState();
      //$(".chart__image").css('display', 'none');
      
      $('#tblCP').DataTable( {
        "fnCreatedRow": function( nRow, aData, iDataIndex ) {
            $(nRow).attr('class', aData[0]);
        }, 
          data: tableData,
          "columnDefs": [ {
            "targets": 0,
            "visible": false
          } ]
      } );

      new Chartkick.PieChart("chartCP", [["Hombes", NRO_FAMILIAS_M], ["Mujeres", NRO_FAMILIAS_F]], {donut: true});

      let chartHeight= $('.chart').height()
      $('#map').height(chartHeight);
      console.log(chartHeight);
    });

    //console.log(tableData);
  });

  capaCP.setMap(map);

  capaCP.setStyle({
    strokeColor: '#d3cc18',
    fillColor: '#d3cc18',
    strokeWeight: 1
  });

  capaCP.addListener('mouseover', function(event) {
    capaCP.revertStyle();
    capaCP.overrideStyle(event.feature, {fillColor:'#5a92a1',strokeColor:'#5a92a1',strokeWeight: 1});
  });

  capaCP.addListener('mouseout', function(event) {
    capaCP.revertStyle();
  });

  capaCP.addListener('addfeature', function(event) {
    let bounds = new google.maps.LatLngBounds();
    processPoints(event.feature.getGeometry(), bounds.extend, bounds);
    map.fitBounds(bounds);
    map.setZoom(10);
  });

}

function cleanForm(){
  $('#txtDenom').val('');
}

function search(){
    let denoInput = $('#txtDenom').val();

    if ( $('#ddlDepartamento').val() != null && $('#ddlProvincia').val() != null && $('#ddlDistrito').val() != null ) { //Todos seleccionados
      let disID = $("#ddlDistrito").val();
      showCP(disID, denoInput);
      console.log('Buscando ' + denoInput + ' en el distrito ' + disID);
    } else if ($('#ddlDepartamento').val() != null && $('#ddlProvincia').val() != null && $('#ddlDistrito').val() === null) { //Departamento => Provincia
      let provID = $("#ddlProvincia").val();
      showDistritos(provID, denoInput);
      console.log('Buscando ' + denoInput + ' en la provincia ' + provID);
    } else if ($('#ddlDepartamento').val() != null && $('#ddlProvincia').val() === null && $('#ddlDistrito').val() === null) { //Departamento
      cleanForm('dep');
      let depID = $("#ddlDepartamento").val();
      showProvincias(depID, denoInput);
      console.log('Buscando ' + denoInput + ' en el departamento ' + depID);
    }else{
      showDepartamentos(denoInput);
      console.log('Buscando ' + denoInput + ' en todos los departamentos');
    }
}

$('#btnBuscar').click(function(e){
  e.preventDefault();
  //initialState();
  search();
});

$('#btnLimpiar').click(function(){
  //debugger;
  //initialState();
  cleanForm();
  showDepartamentos('');
});

showDepartamentos('');


capaDepartamentos.addListener('click', function(event) {
  depID = event.feature.getProperty('ID_DEP');
  // capaDepartamentos.forEach(function (feature) {
  //   capaDepartamentos.remove(feature);
  // });

  // event.feature.setProperty('isColorful', true);
  // event.feature.setProperty('color', 'white');
  // capaProvincias.loadGeoJson('/provincias?deps=' + depID + '&provs=');
  // capaProvincias.setMap(map);
  // let bounds = new google.maps.LatLngBounds();
  // processPoints(event.feature.getGeometry(), bounds.extend, bounds);
  // map.fitBounds(bounds);
  // map.setZoom(8);

  $("#ddlDepartamento").val(depID).change();

});

capaProvincias.addListener('click', function(event) {
  // capaProvincias.forEach(function (feature) {
  //       capaProvincias.remove(feature);
  // });
  // alert(event.feature.getProperty('NOM_PROV'));
  // capaDistritos.setMap(map);
  // let bounds = new google.maps.LatLngBounds();
  // processPoints(event.feature.getGeometry(), bounds.extend, bounds);
  // map.fitBounds(bounds);
  // map.setZoom(8);

  provID = event.feature.getProperty('ID_PROV');
  $("#ddlProvincia").val(provID).change();
  //console.log(event.feature.getProperty('ID_PROV'));
});

capaDistritos.addListener('click', function(event) {
  disID = event.feature.getProperty('ID_DIS');
  let bounds = new google.maps.LatLngBounds();
  processPoints(event.feature.getGeometry(), bounds.extend, bounds);
  map.fitBounds(bounds);
  map.setZoom(8);

  $("#ddlDistrito").val(disID).change();
  //console.log(event.feature);
});

function processPoints(geometry, callback, thisArg) {
  if (geometry instanceof google.maps.LatLng) {
    callback.call(thisArg, geometry);
  } else if (geometry instanceof google.maps.Data.Point) {
    callback.call(thisArg, geometry.get());
  } else {
    geometry.getArray().forEach(function(g) {
      processPoints(g, callback, thisArg);
    });
  }
}

$(document).ready(function() {
    $.ajax({
      url: 'http://qa.agrorural.gob.pe/WebAPI_GeoAgro/api/geo/ListarDepartamentoscombo',
      data: "{}",
      headers: { 
      'Accept': 'application/json',
      'Content-Type': 'application/json' 
      },
      contentType: "application/json;",
      type: "post",
      success: function (resultado) {
        //console.log(resultado);
        $("#ddlDepartamento").empty();
        $("#ddlDepartamento").append("<option value='00' disabled selected>Seleccione</option>");
        $.each(resultado, function (index, value) {
          if( value.ID_DEP === '03' || value.ID_DEP === '05' || value.ID_DEP === '09' || value.ID_DEP === '10' || value.ID_DEP === '12' || value.ID_DEP === '19' ){
            $("#ddlDepartamento").append("<option value=" + value.ID_DEP + ">" + value.NOM_DEP + "</option>");
          }
        });
      },
      error: function (xhr, status, error) {

      }
    });


    $("#ddlDepartamento").change(function(event){
      initialState();
      showProvincias($(this).val(), $('#txtDenom').val());

      $.ajax({
        url: 'http://qa.agrorural.gob.pe/WebAPI_GeoAgro/api/geo/ListarProvinciascombo',
        data: "{ ID_DEP: '" + $(this).val() + "'}",
        headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
        },
        contentType: "application/json;",
        type: "post",
        success: function (resultado) {
          //console.log(resultado);
          $("#ddlProvincia").empty();
          $("#ddlProvincia").append("<option value='00' disabled selected>Seleccione</option>");
          $.each(resultado, function (index, value) {
              $("#ddlProvincia").append("<option value=" + value.ID_PROV + ">" + value.NOM_PROV + "</option>");
          });
        },
        error: function (xhr, status, error) {

        }
      });
    });

    $("#ddlProvincia").change(function(){
      initialState();     
      showDistritos($(this).val(), $('#txtDenom').val());

      $.ajax({
        url: 'http://qa.agrorural.gob.pe/WebAPI_GeoAgro/api/geo/ListarDistritoscombo',
        data: "{ ID_PROV: '" + $(this).val() + "'}",
        headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
        },
        contentType: "application/json;",
        type: "post",
        success: function (resultado) {
          //console.log(resultado);
          $("#ddlDistrito").empty();
          $("#ddlDistrito").append("<option value='00' disabled selected>Seleccione</option>");
          $.each(resultado, function (index, value) {
              $("#ddlDistrito").append("<option value=" + value.ID_DIS + ">" + value.NOM_DIS + "</option>");
          });
        },
        error: function (xhr, status, error) {

        }
      });
    });

    $("#ddlDistrito").change(function(){
      initialState();    
      showCP($(this).val(), $('#txtDenom').val());
    });
});