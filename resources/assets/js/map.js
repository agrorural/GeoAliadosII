let tipoMapa = 1;
let map;
let aliadosDepID = '03, 05, 09, 12, 19';
let depID = '';
let proID = '';
let disID = '';

map = new google.maps.Map(document.getElementById('map'), {
  zoom: 5,
  center: {lat: -12.079652, lng: -77.042575},
  styles: [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f5f5"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ffffff"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dadada"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e5e5e5"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#eeeeee"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#c9c9c9"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  }
]
});

let capaDepartamentos = new google.maps.Data();
let capaProvincias = new google.maps.Data();
let capaDistritos = new google.maps.Data();

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

  capaDepartamentos.loadGeoJson('/departamentos?deps=' + aliadosDepID + '&provs=');

  capaDepartamentos.setStyle({
    strokeColor: 'orange',
    fillColor: 'orange',
    strokeWeight: 2
  });

  capaDepartamentos.addListener('mouseover', function(event) {
    capaDepartamentos.revertStyle();
    capaDepartamentos.overrideStyle(event.feature, {fillColor:'red',strokeColor:'red',strokeWeight: 2});
  });

  capaDepartamentos.addListener('mouseout', function(event) {
    capaDepartamentos.revertStyle();
  });

  capaDepartamentos.setMap(map);
  map.setZoom(5);
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
    strokeColor: 'blue',
    fillColor: 'blue',
    strokeWeight: 2
  });

  capaProvincias.addListener('mouseover', function(event) {
    capaProvincias.revertStyle();
    capaProvincias.overrideStyle(event.feature, {fillColor:'red',strokeColor:'red',strokeWeight: 2});
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
    strokeColor: 'green',
    fillColor: 'green',
    strokeWeight: 2
  });

  capaDistritos.addListener('mouseover', function(event) {
    capaDistritos.revertStyle();
    capaDistritos.overrideStyle(event.feature, {fillColor:'red',strokeColor:'red',strokeWeight: 2});
  });

  capaDistritos.addListener('mouseout', function(event) {
    capaDistritos.revertStyle();
  });

  capaDistritos.addListener('addfeature', function(event) {
    let bounds = new google.maps.LatLngBounds();
    processPoints(event.feature.getGeometry(), bounds.extend, bounds);
    map.fitBounds(bounds);
    map.setZoom(8);
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

        console.log($("#ddlDepartamento").val());
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
  console.log(event.feature.getProperty('ID_PROV'));
});

capaDistritos.addListener('click', function(event) {
  disID = event.feature.getProperty('ID_DIS');
  let bounds = new google.maps.LatLngBounds();
  processPoints(event.feature.getGeometry(), bounds.extend, bounds);
  map.fitBounds(bounds);
  map.setZoom(8);

  $("#ddlDistrito").val(disID).change();
  console.log(event.feature);
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
          console.log(resultado);
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