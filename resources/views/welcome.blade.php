@extends ('master')
@section('head')
    <title>Bienvenido</title>
@stop
@section('content')
    <div id="app">
        <div class="app-container">
            <div class="search">
                <form>
                  <div class="form-group">
                    <label for="ddlDepartamento">Departamento</label>
                    <select id="ddlDepartamento" class="form-control input-sm">
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="ddlProvincia">Provincia</label>
                    <select id="ddlProvincia" class="form-control input-sm">
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="ddlDistrito">Distrito</label>
                    <select id="ddlDistrito" class="form-control input-sm">
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="ddlPlan">Plan</label>
                    <select id="ddlPlan" class="form-control input-sm">
                      <option>Seleccione plan</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="ddlCadena">Cadena</label>
                    <select id="ddlCadena" class="form-control input-sm">
                      <option>Seleccione cadena</option>
                    </select>
                  </div>
                  <div class="form-group txtDenom input-group">
                    <label for="txtDenom">Denominación</label>
                    <input id="txtDenom" type="text" class="form-control input-sm" placeholder="">
                    <span class="input-group-btn input-group-btn-with-label">
                      <button id="btnBuscar" type="submit" class="btn btn-default btn-sm">Buscar</button>
                      <button id="btnLimpiar" type="button" class="btn btn-default btn-sm" data-toggle="tooltip" data-placement="top" title="Limpiar búsqueda"><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span></button>
                    </span>
                  </div>
                </form>
            </div>
            <div class="map">
                <div id="map" style="height: 900px"></div>
            </div>
            <div class="chart">
              <div class="spinner-wrapper">
                <div class="spinner">
                  <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
                <div class="chart__table" style="margin-bottom: 15px;">
                </div>
                <div class="chart__image" style="">
                </div>
            </div>
        </div>

    </div>
@stop
@section('footer')
@stop
