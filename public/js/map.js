!function(e){function t(n){if(o[n])return o[n].exports;var a=o[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,t),a.l=!0,a.exports}var o={};t.m=e,t.c=o,t.d=function(e,o,n){t.o(e,o)||Object.defineProperty(e,o,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var o=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(o,"a",o),o},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=43)}({43:function(e,t,o){e.exports=o(44)},44:function(e,t){function o(){$(".spinner-wrapper").show(),$(".chart__table").html(""),$(".chart__image").html("")}function n(){$(".spinner-wrapper").hide()}function a(e){var t=e.toString().split(".");return t[0]=t[0].replace(/\B(?=(\d{3})+(?!\d))/g,","),t.join(".")}function r(e){$("#ddlDistrito").empty(),$("#ddlDistrito").append("<option value='00' disabled selected>Seleccione</option>"),$("#ddlProvincia").empty(),$("#ddlProvincia").append("<option value='00' disabled selected>Seleccione</option>"),o(),h="00",$("#ddlDepartamento option").each(function(){$(this).val()===h?$(this).attr("selected",!0):$(this).attr("selected",!1)}),y.forEach(function(e){y.remove(e)}),v.forEach(function(e){v.remove(e)}),g.forEach(function(e){g.remove(e)}),D.forEach(function(e){D.remove(e)}),y.loadGeoJson("/departamentos?deps="+u+"&provs=&deno="+e,null,function(e){$(".chart__table").html('\n      <table id="tblDep" class="table table-striped table-bordered table-hover table-responsive">\n        <thead class="thead-dark">\n        </thead>\n        <tbody>\n        </tbody>\n      </table>\n    '),$(".chart__image").html('\n      <div id="chartDep" style="height:450px"></div>\n    ');var t=[],o=[];$(".chart__table").find("table thead").append('\n      <tr>\n        <th rowspan="2">ID</th>\n        <th rowspan="2">Departamento</th>\n        <th colspan="2">PDN</th>\n        <th colspan="2">PDNC</th>\n        <th colspan="2">PDT</th>\n      </tr>\n      <tr>\n        <th scope="col">Nº</th>\n        <th scope="col">Inversión</th>\n        <th scope="col">Nº</th>\n        <th scope="col">Inversión</th>\n        <th scope="col">Nº</th>\n        <th scope="col">Inversión</th>\n      </tr>\n    '),e.forEach(function(e){t.push([e.f.ID_DEP,e.f.NOMBDEP,e.f.Nro_pdn,"S/. "+a(e.f.Inversion_pdn),e.f.Nro_pdnc,"S/. "+a(e.f.Inversion_pdnc),e.f.Nro_pdt,"S/. "+a(e.f.Inversion_pdt)]),o.push({name:e.f.NOMBDEP,data:{PDN:parseInt(e.f.Nro_pdn),PDNC:parseInt(e.f.Nro_pdnc),PDT:parseInt(e.f.Nro_pdt)}})}),$(function(){n(),$("#tblDep").DataTable({fnCreatedRow:function(e,t,o){$(e).attr("id",t[0])},data:t,columnDefs:[{targets:0,visible:!1}]}),new Chartkick.ColumnChart("chartDep",o,{legend:"bottom"})})}),y.setStyle({strokeColor:"red",fillColor:"red",strokeWeight:1}),y.addListener("mouseover",function(e){y.revertStyle(),y.overrideStyle(e.feature,{fillColor:"#5a92a1",strokeColor:"#5a92a1",strokeWeight:1}),$(".chart__table").find("table tbody tr#"+e.feature.getProperty("ID_DEP")).addClass("success")}),y.addListener("mouseout",function(e){y.revertStyle(),$(".chart__table").find("table tbody tr").removeClass("success")}),y.setMap(f),f.setZoom(6)}function l(e,t){y.forEach(function(e){y.remove(e)}),v.forEach(function(e){v.remove(e)}),g.forEach(function(e){g.remove(e)}),D.forEach(function(e){D.remove(e)}),$("#ddlDepartamento option").each(function(){$(this).val()===e?$(this).attr("selected",!0):$(this).attr("selected",!1)}),v.loadGeoJson("/provincias?deps="+e+"&provs=&deno="+t,null,function(e){$(".chart__table").html('\n      <table id="tblProv" class="table table-striped table-bordered table-hover table-responsive">\n        <thead class="thead-dark">\n        </thead>\n        <tbody>\n        </tbody>\n      </table>\n    '),$(".chart__image").html('\n      <div id="chartProv" style="height:450px"></div>\n    ');var t=[],o=[];$(".chart__table").find("table thead").append('\n      <tr>\n        <th rowspan="2">ID</th>\n        <th rowspan="2">Provincia</th>\n        <th colspan="2">PDN</th>\n        <th colspan="2">PDNC</th>\n        <th colspan="2">PDT</th>\n      </tr>\n      <tr>\n        <th scope="col">Nº</th>\n        <th scope="col">Inversión</th>\n        <th scope="col">Nº</th>\n        <th scope="col">Inversión</th>\n        <th scope="col">Nº</th>\n        <th scope="col">Inversión</th>\n      </tr>\n    '),e.forEach(function(e){t.push([e.f.ID_PROV,e.f.NOM_PROV,e.f.Nro_pdn,"S/. "+a(e.f.Inversion_pdn),e.f.Nro_pdnc,"S/. "+a(e.f.Inversion_pdnc),e.f.Nro_pdt,"S/. "+a(e.f.Inversion_pdt)]),o.push({name:e.f.NOM_PROV,data:{PDN:parseInt(e.f.Nro_pdn),PDNC:parseInt(e.f.Nro_pdnc),PDT:parseInt(e.f.Nro_pdt)}})}),$(function(){n(),$("#tblProv").DataTable({fnCreatedRow:function(e,t,o){$(e).attr("id",t[0])},data:t,columnDefs:[{targets:0,visible:!1}]}),new Chartkick.ColumnChart("chartProv",o,{legend:"bottom"})})}),v.setMap(f),v.setStyle({strokeColor:"orange",fillColor:"orange",strokeWeight:1}),v.addListener("mouseover",function(e){v.revertStyle(),v.overrideStyle(e.feature,{fillColor:"#5a92a1",strokeColor:"#5a92a1",strokeWeight:1})}),v.addListener("mouseout",function(e){v.revertStyle()}),v.addListener("addfeature",function(e){var t=new google.maps.LatLngBounds;p(e.feature.getGeometry(),t.extend,t),f.fitBounds(t),f.setZoom(7)}),c("dep")}function i(e,t){y.forEach(function(e){y.remove(e)}),v.forEach(function(e){v.remove(e)}),g.forEach(function(e){g.remove(e)}),D.forEach(function(e){D.remove(e)}),provID=e,$("#ddlProvincia option").each(function(){$(this).val()===provID?$(this).attr("selected",!0):$(this).attr("selected",!1)}),g.loadGeoJson("/distritos?deps=&provs="+provID+"&dis=&deno="+t,null,function(e){chartMultiData=[],$(".chart__table").find("table tbody").empty(),$(".chart__image").find("#columnchart_material").empty(),n()}),g.setMap(f),g.setStyle({strokeColor:"#d3cc18",fillColor:"#d3cc18",strokeWeight:1}),g.addListener("mouseover",function(e){g.revertStyle(),g.overrideStyle(e.feature,{fillColor:"#5a92a1",strokeColor:"#5a92a1",strokeWeight:1})}),g.addListener("mouseout",function(e){g.revertStyle()}),g.addListener("addfeature",function(e){var t=new google.maps.LatLngBounds;p(e.feature.getGeometry(),t.extend,t),f.fitBounds(t),f.setZoom(9)})}function s(e,t){m=e,y.forEach(function(e){y.remove(e)}),v.forEach(function(e){v.remove(e)}),g.forEach(function(e){g.remove(e)}),D.forEach(function(e){D.remove(e)}),$("#ddlDistrito option").each(function(){$(this).val()===m?$(this).attr("selected",!0):$(this).attr("selected",!1)}),D.loadGeoJson("/cp?deps=&provs=&dis="+m+"&ccpps=&deno="+t),D.setMap(f),D.setStyle({strokeColor:"#d3cc18",fillColor:"#d3cc18",strokeWeight:1}),D.addListener("mouseover",function(e){D.revertStyle(),D.overrideStyle(e.feature,{fillColor:"#5a92a1",strokeColor:"#5a92a1",strokeWeight:1})}),D.addListener("mouseout",function(e){D.revertStyle()}),D.addListener("addfeature",function(e){var t=new google.maps.LatLngBounds;p(e.feature.getGeometry(),t.extend,t),f.fitBounds(t),f.setZoom(10)})}function c(){$("#txtDenom").val("")}function d(){var e=$("#txtDenom").val();if(null!=$("#ddlDepartamento").val()&&null!=$("#ddlProvincia").val()&&null!=$("#ddlDistrito").val()){var t=$("#ddlDistrito").val();s(t,e)}else if(null!=$("#ddlDepartamento").val()&&null!=$("#ddlProvincia").val()&&null===$("#ddlDistrito").val()){var o=$("#ddlProvincia").val();i(o,e)}else if(null!=$("#ddlDepartamento").val()&&null===$("#ddlProvincia").val()&&null===$("#ddlDistrito").val()){c("dep");var n=$("#ddlDepartamento").val();l(n,e)}else r(e)}function p(e,t,o){e instanceof google.maps.LatLng?t.call(o,e):e instanceof google.maps.Data.Point?t.call(o,e.get()):e.getArray().forEach(function(e){p(e,t,o)})}var f=void 0,u="03,05,09,10,12,19",h="",m="";o(),f=new google.maps.Map(document.getElementById("map"),{zoom:6,center:{lat:-12.079652,lng:-77.042575},styles:[{elementType:"geometry",stylers:[{color:"#f5f1e6"}]},{elementType:"labels.text.fill",stylers:[{color:"#523735"}]},{elementType:"labels.text.stroke",stylers:[{color:"#f5f1e6"}]},{featureType:"administrative",elementType:"geometry.stroke",stylers:[{color:"#656366"}]},{featureType:"administrative.land_parcel",elementType:"geometry.stroke",stylers:[{color:"#f5f1e6"}]},{featureType:"administrative.land_parcel",elementType:"labels.text.fill",stylers:[{color:"#ae9e90"}]},{featureType:"landscape.natural",elementType:"geometry",stylers:[{color:"#eaebed"}]},{featureType:"poi",elementType:"geometry",stylers:[{color:"#eaebed"}]},{featureType:"poi",elementType:"labels.text.fill",stylers:[{color:"#93817c"}]},{featureType:"poi.park",elementType:"geometry.fill",stylers:[{color:"#cbdaaf"}]},{featureType:"poi.park",elementType:"labels.text.fill",stylers:[{color:"#447530"}]},{featureType:"road",elementType:"geometry",stylers:[{color:"#f5f1e6"}]},{featureType:"road.arterial",elementType:"geometry",stylers:[{color:"#fdfcf8"}]},{featureType:"road.highway",elementType:"geometry",stylers:[{color:"#cbdaaf"}]},{featureType:"road.highway",elementType:"geometry.stroke",stylers:[{color:"#b3c8aa"}]},{featureType:"road.highway.controlled_access",elementType:"geometry",stylers:[{color:"#f5f1e6"}]},{featureType:"road.highway.controlled_access",elementType:"geometry.stroke",stylers:[{color:"#b3c8aa"}]},{featureType:"road.local",elementType:"labels.text.fill",stylers:[{color:"#806b63"}]},{featureType:"transit.line",elementType:"geometry",stylers:[{color:"#d7d8dc"}]},{featureType:"transit.line",elementType:"labels.text.fill",stylers:[{color:"#8f7d77"}]},{featureType:"transit.line",elementType:"labels.text.stroke",stylers:[{color:"#ebe3cd"}]},{featureType:"transit.station",elementType:"geometry",stylers:[{color:"#d7d8dc"}]},{featureType:"water",elementType:"geometry.fill",stylers:[{color:"#ccdfe6"}]},{featureType:"water",elementType:"labels.text.fill",stylers:[{color:"#92998d"}]}]});var y=new google.maps.Data,v=new google.maps.Data,g=new google.maps.Data,D=new google.maps.Data;$("#btnBuscar").click(function(e){e.preventDefault(),d()}),$("#btnLimpiar").click(function(){c(),r("")}),r(""),y.addListener("click",function(e){h=e.feature.getProperty("ID_DEP"),$("#ddlDepartamento").val(h).change()}),v.addListener("click",function(e){provID=e.feature.getProperty("ID_PROV"),$("#ddlProvincia").val(provID).change()}),g.addListener("click",function(e){m=e.feature.getProperty("ID_DIS");var t=new google.maps.LatLngBounds;p(e.feature.getGeometry(),t.extend,t),f.fitBounds(t),f.setZoom(8),$("#ddlDistrito").val(m).change()}),$(document).ready(function(){$.ajax({url:"http://qa.agrorural.gob.pe/WebAPI_GeoAgro/api/geo/ListarDepartamentoscombo",data:"{}",headers:{Accept:"application/json","Content-Type":"application/json"},contentType:"application/json;",type:"post",success:function(e){$("#ddlDepartamento").empty(),$("#ddlDepartamento").append("<option value='00' disabled selected>Seleccione</option>"),$.each(e,function(e,t){"03"!==t.ID_DEP&&"05"!==t.ID_DEP&&"09"!==t.ID_DEP&&"10"!==t.ID_DEP&&"12"!==t.ID_DEP&&"19"!==t.ID_DEP||$("#ddlDepartamento").append("<option value="+t.ID_DEP+">"+t.NOM_DEP+"</option>")})},error:function(e,t,o){}}),$("#ddlDepartamento").change(function(e){o(),l($(this).val(),$("#txtDenom").val()),$.ajax({url:"http://qa.agrorural.gob.pe/WebAPI_GeoAgro/api/geo/ListarProvinciascombo",data:"{ ID_DEP: '"+$(this).val()+"'}",headers:{Accept:"application/json","Content-Type":"application/json"},contentType:"application/json;",type:"post",success:function(e){$("#ddlProvincia").empty(),$("#ddlProvincia").append("<option value='00' disabled selected>Seleccione</option>"),$.each(e,function(e,t){$("#ddlProvincia").append("<option value="+t.ID_PROV+">"+t.NOM_PROV+"</option>")})},error:function(e,t,o){}})}),$("#ddlProvincia").change(function(){o(),i($(this).val(),$("#txtDenom").val()),$.ajax({url:"http://qa.agrorural.gob.pe/WebAPI_GeoAgro/api/geo/ListarDistritoscombo",data:"{ ID_PROV: '"+$(this).val()+"'}",headers:{Accept:"application/json","Content-Type":"application/json"},contentType:"application/json;",type:"post",success:function(e){$("#ddlDistrito").empty(),$("#ddlDistrito").append("<option value='00' disabled selected>Seleccione</option>"),$.each(e,function(e,t){$("#ddlDistrito").append("<option value="+t.ID_DIS+">"+t.NOM_DIS+"</option>")})},error:function(e,t,o){}})}),$("#ddlDistrito").change(function(){o(),s($(this).val(),$("#txtDenom").val())})})}});