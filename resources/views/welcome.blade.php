@extends ('master')
@section('head')
    <title>Bienvenido</title>
@stop
@section('content')
    <div id="app">
        <div class="page-header">
            <h1>Georeferenciación de Proyectos</h1>
        </div>
        
        <div class="app-container">
            <div class="search">
                <form>
                  <div class="form-group">
                    <label for="ddlDepartamento">Departamento</label>
                    <select id="ddlDepartamento" class="form-control">
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="ddlProvincia">Provincia</label>
                    <select id="ddlProvincia" class="form-control">
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="ddlDistrito">Distrito</label>
                    <select id="ddlDistrito" class="form-control">
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="ddlPlan">Plan</label>
                    <select id="ddlPlan" class="form-control">
                      <option>Seleccione plan</option>
                    </select>
                  </div>
                  <div class="form-group">
                    <label for="ddlCadena">Cadena</label>
                    <select id="ddlCadena" class="form-control">
                      <option>Seleccione cadena</option>
                    </select>
                  </div>
                  <div class="form-group txtDenom">
                    <label for="txtDenom">Denominación</label>
                    <input id="txtDenom" type="text" class="form-control" placeholder="">
                  </div>
                  <div class="form-group btn-group" role="group" aria-label="...">
                    <label for="btnBuscar" class="" style="display: block;">&nbsp;</label>
                    <button id="btnBuscar" type="submit" class="btn btn-default">Buscar</button>
                    <button id="btnLimpiar" type="button" class="btn btn-default" data-toggle="tooltip" data-placement="top" title="Limpiar búsqueda"><span class="glyphicon glyphicon-refresh" aria-hidden="true"></span></button>
                  </div>
                </form>
            </div>
            <div class="map">
                <div id="map"></div>
            </div>
            <div class="chart">
              <div class="spinner-wrapper">
                <div class="spinner">
                  <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
                <div class="chart__table" style="height: 300px; margin-bottom: 30px;">
                  <table class="table table-striped table-bordered table-hover table-responsive">
                    <thead class="thead-dark">
                      <tr>
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
                    </thead>
                    <tbody>
                    </tbody>
                  </table>
                </div>
                <div class="chart__image" style="height: 300px">
                  <div id="columnchart_material" style="height: 300px"></div>
                </div>
            </div>
        </div>

    </div>
@stop
@section('footer')
@stop
