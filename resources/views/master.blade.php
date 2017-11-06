<!doctype html>
<html lang="{{ app()->getLocale() }}">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <!-- Styles -->
        <link href="{{ mix('css/app.css') }}" rel="stylesheet" type="text/css">
        <link href="https://cdn.datatables.net/1.10.16/css/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css">
        <link href="https://cdn.datatables.net/responsive/2.2.0/css/responsive.bootstrap4.min.css" rel="stylesheet" type="text/css">
        
        <!--Load the AJAX API-->
        <script src="https://www.gstatic.com/charts/loader.js"></script>
        <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/chartkick/2.2.4/chartkick.js"></script>
        @yield('head')
    </head>
    <body>
        <div class="container-fluid">
          <div class="row">
            <div class="col-xs-12 col-sm-12 col-md-12 main">
              @yield('content')
            </div>
          </div>
        </div>

        @yield('footer')
        <script src="{{ mix('js/app.js') }}"></script>
        <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAxwYkZXk1iIQaP7W2VB8IKeRjtgpsGqS4"></script>
        <script src="https://use.fontawesome.com/00e9311fd7.js"></script>
        <script src="https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>
        <script src="https://cdn.datatables.net/1.10.16/js/dataTables.bootstrap4.min.js"></script>
        <script src="https://cdn.datatables.net/responsive/2.2.0/js/dataTables.responsive.min.js"></script>
        <script src="https://cdn.datatables.net/responsive/2.2.0/js/responsive.bootstrap4.min.js"></script>
        <script src="{{ mix('js/map.js') }}"></script>
    </body>
</html>
