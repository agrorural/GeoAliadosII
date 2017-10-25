let tipoMapa = 1;
let map;
let aliadosDepID = '03,05,09,12,19';
let depID = '';
let proID = '';
let disID = '';

map = new google.maps.Map(document.getElementById('map'), {
  zoom: 5,
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

let dataDepartamentos = null;

function showDepartamentos(){
  cleanForm();

  depID = '00';

  $("#ddlDepartamento option").each(function(){
    if($(this).val() == depID){
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


  capaDepartamentos.loadGeoJson('/departamentos?deps=' + aliadosDepID + '&provs=', null, function(event){
    //console.log(event);
    chartData = [];
    setData = [];
    
    $('.chart__table').find("table tbody").empty();
    event.forEach(function(feature){
      chartData.push([feature.f.NOMBDEP, parseInt(feature.f.Inversion_pdn)]);
      setData.push({name: feature.f.NOMBDEP, data: {"PDN": parseInt(feature.f.Nro_pdn), "PDNC": parseInt(feature.f.Nro_pdnc), "PDT": parseInt(feature.f.Nro_pdt)}});
      console.log(feature.f);
      $('.chart__table').find("table tbody").append('<tr id="' + feature.f.ID_DEP + '"><th scope="row">' + feature.f.NOMBDEP + '</th><td>' + feature.f.Nro_pdn + '</td><td>S/. ' + feature.f.Inversion_pdn + '</td><td>' + feature.f.Nro_pdnc + '</td><td>S/. ' + feature.f.Inversion_pdnc + '</td><td>' + feature.f.Nro_pdt + '</td><td>S/. ' + feature.f.Inversion_pdt + '</td></tr>');
    });

    new Chartkick.ColumnChart("columnchart_material", setData, {legend: "bottom"});

    console.log(setData);
  });

  capaDepartamentos.setStyle({
    strokeColor: 'red',
    fillColor: 'red',
    strokeWeight: 1
  });

  capaDepartamentos.addListener('mouseover', function(event) {
    capaDepartamentos.revertStyle();
    capaDepartamentos.overrideStyle(event.feature, {fillColor:'#5a92a1',strokeColor:'#5a92a1',strokeWeight: 1});
    

    let IDI_DEP = event.feature.getProperty('ID_DEP');

    $(".chart__table").find("table tbody tr#" + IDI_DEP ).addClass('success');

    //console.log(IDI_DEP);

  });

  capaDepartamentos.addListener('mouseout', function(event) {
    capaDepartamentos.revertStyle();
    $(".chart__table").find("table tbody tr").removeClass('success');
  });

  capaDepartamentos.setMap(map);
  map.setZoom(5);

  //console.log(capaDepartamentos);
}

function showProvincias(id){
  cleanForm('dep');

  capaDepartamentos.forEach(function (feature) {
    capaDepartamentos.remove(feature);
  });

  capaProvincias.forEach(function (feature) {
    capaProvincias.remove(feature);
  });

  capaDistritos.forEach(function (feature) {
    capaDistritos.remove(feature);
  });

  depID = id;

  $("#ddlDepartamento option").each(function(){
    if($(this).val() == depID){
      $(this).attr('selected', true);    
    }else{
      $(this).attr('selected', false);
    }
  });

  capaProvincias.loadGeoJson('/provincias?deps=' + depID + '&provs=');

  capaProvincias.setMap(map);

  capaProvincias.setStyle({
    strokeColor: 'orange',
    fillColor: 'orange',
    strokeWeight: 1
  });

  capaProvincias.addListener('mouseover', function(event) {
    capaProvincias.revertStyle();
    capaProvincias.overrideStyle(event.feature, {fillColor:'#5a92a1',strokeColor:'#5a92a1',strokeWeight: 1});
  });

  capaProvincias.addListener('mouseout', function(event) {
    capaProvincias.revertStyle();
  });

  capaProvincias.addListener('addfeature', function(event) {
    let bounds = new google.maps.LatLngBounds();
    processPoints(event.feature.getGeometry(), bounds.extend, bounds);
    map.fitBounds(bounds);
    map.setZoom(7);
  });
}

function showDistritos(id){
  capaDepartamentos.forEach(function (feature) {
    capaDepartamentos.remove(feature);
  });

  capaProvincias.forEach(function (feature) {
    capaProvincias.remove(feature);
  });

  capaDistritos.forEach(function (feature) {
    capaDistritos.remove(feature);
  });

  provID = id;

  $("#ddlDistrito option").each(function(){
    if($(this).val() == provID){
      $(this).attr('selected', true);    
    }else{
      $(this).attr('selected', false);
    }
  });

  capaDistritos.loadGeoJson('/distritos?deps=&provs=' + provID + '&dis=');

  capaDistritos.setMap(map);

  capaDistritos.setStyle({
    strokeColor: '#d3cc18',
    fillColor: '#d3cc18',
    strokeWeight: 1
  });

  capaDistritos.addListener('mouseover', function(event) {
    capaDistritos.revertStyle();
    capaDistritos.overrideStyle(event.feature, {fillColor:'#5a92a1',strokeColor:'#5a92a1',strokeWeight: 1});
  });

  capaDistritos.addListener('mouseout', function(event) {
    capaDistritos.revertStyle();
  });

  capaDistritos.addListener('addfeature', function(event) {
    let bounds = new google.maps.LatLngBounds();
    processPoints(event.feature.getGeometry(), bounds.extend, bounds);
    map.fitBounds(bounds);
    map.setZoom(9);
  });
}

function showCP(id){
  disID = id;

  $("#ddlDistrito option").each(function(){
    if($(this).val() == disID){
      $(this).attr('selected', true);    
    }else{
      $(this).attr('selected', false);
    }
  });
}

function cleanForm(ex){
  $('.search').find('form').trigger("reset");
  switch(ex) {
    case 'dep':
        $("#ddlProvincia").val('00').change();
        $("#ddlDistrito").empty();
        $("#ddlDistrito").append("<option value='00' disabled selected>Seleccione</option>");
        break;
    case 'pro':
        $("#ddlDepartamento").val('00').change();
        $("#ddlDistrito").val('00').change();
        break;
    case 'dis':
        $("#ddlDepartamento").val('00').change();
        $("#ddlProvincia").val('00').change();
        break;
    default:
        $("#ddlDepartamento").val('00').change();

        //console.log($("#ddlDepartamento").val());
        $("#ddlProvincia").empty();
        $("#ddlProvincia").append("<option value='00' disabled selected>Seleccione</option>");
        $("#ddlDistrito").empty();
        $("#ddlDistrito").append("<option value='00' disabled selected>Seleccione</option>");
  }
}

$('#btnLimpiar').click(function(){
  cleanForm();

  showDepartamentos();
});

showDepartamentos();


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

$( document ).ready(function() {
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
          if( value.ID_DEP === '03' || value.ID_DEP === '05' || value.ID_DEP === '09' || value.ID_DEP === '12' || value.ID_DEP === '19' ){
            $("#ddlDepartamento").append("<option value=" + value.ID_DEP + ">" + value.NOM_DEP + "</option>");
          }
        });
      },
      error: function (xhr, status, error) {

      }
    });


    $("#ddlDepartamento").change(function(event){

      depID = $(this).val();
      
      showProvincias(depID);



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
      provID = $(this).val();
      
      showDistritos(provID);

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
      disID = $(this).val();
      
      showCP(disID);
    });
});