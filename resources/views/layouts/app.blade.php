<!DOCTYPE html>
<html class="loading" lang="en" data-textdirection="ltr">
<!-- BEGIN: Head-->

<head>

    <meta name="csrf-token" content="{{ csrf_token() }}">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimal-ui">
    {{-- <meta name="description" content="Vuexy admin is super flexible, powerful, clean &amp; modern responsive bootstrap 4 admin template with unlimited possibilities."> --}}
    {{-- <meta name="keywords" content="admin template, Vuexy admin template, dashboard template, flat admin template, responsive admin template, web app"> --}}
    <meta name="author" content="PIXINVENT">
    <title>Web Reinvent | Task</title>
    <link rel="apple-touch-icon" href="{{ asset('admin/images/ico/apple-icon-120.png') }}">
    <link rel="shortcut icon" type="image/x-icon" href="{{ asset('admin/images/ico/favicon.ico') }}">
    <link href="https://fonts.googleapis.com/css?family=Montserrat:300,400,500,600" rel="stylesheet">
    <!-- BEGIN: Vendor CSS-->
    <link rel="stylesheet" type="text/css" href="{{ asset('admin/vendors/css/vendors.min.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('admin/vendors/css/forms/select/select2.min.css') }}">
    <!-- END: Vendor CSS-->

    <!-- BEGIN: Theme CSS-->
    <link rel="stylesheet" type="text/css" href="{{ asset('admin/css/bootstrap.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('admin/css/bootstrap-extended.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('admin/css/colors.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('admin/css/components.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('admin/vendors/css/tables/datatable/datatables.min.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('admin/vendors/css/pickers/pickadate/pickadate.css') }}">

    <!-- BEGIN: Page CSS-->
    <link rel="stylesheet" type="text/css" href="{{ asset('admin/css/core/menu/menu-types/vertical-menu.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('admin/css/core/colors/palette-gradient.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('admin/vendors/css/extensions/toastr.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('admin/css/pages/invoice.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('admin/css/custom.css') }}">

    <!-- END: Page CSS-->
    <script src="{{ asset('admin/js/core/libraries/jquery.min.js') }}"></script>
    <script src="{{ asset('admin/js/jquery.validate.min.js') }}"></script>


</head>
<!-- END: Head-->

<!-- BEGIN: Body-->

<body id="js-main-content" class="vertical-layout vertical-menu-modern 2-columns  navbar-floating footer-static"
    data-open="click" data-menu="vertical-menu-modern" data-col="2-columns">



    @include('layouts.header')
    <style>
        .table {
            font-size: 14px;
        }

        .nav-item {
            font-size: 14px;
        }
    </style>
    @include('layouts.sidebar')


    <div class="app-content content">
        <div class="content-overlay"></div>
        <div class="header-navbar-shadow"></div>
        <div class="content-wrapper">
            <div class="content-header row">
            </div>
            <div class="content-body">
                @if (isset($errors) && count($errors))
                    <div class="alert alert-danger">
                        <span class="closebtn float-right"
                            onclick="this.parentElement.style.display='none';">&times;</span>
                        <b>Sorry, but there was an error:</b>
                        <ul class='m-0'>
                            @foreach ($errors->all() as $error)
                                <li>{{ $error }}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif
                @if (session()->has('success'))
                    <div class="alert alert-success">
                        <span class="closebtn float-right"
                            onclick="this.parentElement.style.display='none';">&times;</span>
                        <b>Success:</b>
                        @if (is_array(session('success')))
                            <ul class='m-0'>
                                @foreach (session('success') as $message)
                                    <li>{{ $message }}</li>
                                @endforeach
                            </ul>
                        @else
                            {{ session('success') }}
                        @endif
                    </div>
                @endif


                @include('layouts.flash')
                @yield('content')
            </div>
        </div>
    </div>

    <div class="sidenav-overlay"></div>
    <div class="drag-target"></div>

    <script src="{{ asset('admin/vendors/js/vendors.min.js') }}"></script>
    <script src="{{ asset('admin/vendors/js/forms/select/select2.full.min.js') }}"></script>

    <script src="{{ asset('admin/js/jquery.form.min.js') }}"></script>
    <script src="{{ asset('admin/js/jquery.validate.min.js') }}"></script>
    <script src="{{ asset('admin/js/admin-custom.js') }}"></script>

    <script src="{{ asset('admin/js/core/app-menu.js') }}"></script>
    <script src="{{ asset('admin/js/core/app.js') }}"></script>
    <script src="{{ asset('admin/js/scripts/components.js') }}"></script>
    <script src="{{ asset('admin/vendors/js/extensions/toastr.min.js') }}"></script>




    <script src="{{ asset('admin/vendors/js/tables/datatable/datatables.min.js') }}"></script>
    <script src="{{ asset('admin/vendors/js/tables/datatable/datatables.bootstrap4.min.js') }}"></script>
    <script src="{{ asset('admin/vendors/js/charts/apexcharts.min.js') }}"></script>
    <script src="{{ asset('admin/vendors/js/charts/chart.min.js') }}"></script>

    <script src="{{ asset('admin/vendors/js/pickers/pickadate/picker.js') }}"></script>
    <script src="{{ asset('admin/vendors/js/pickers/pickadate/picker.date.js') }}"></script>
    <script src="{{ asset('admin/vendors/js/pickers/pickadate/picker.time.js') }}"></script>
    <script src="{{ asset('admin/vendors/js/pickers/dateTime/pick-a-datetime.js') }}"></script>

    <script src="{{ asset('admin/js/scripts/forms/select/form-select2.js') }}"></script>

    {{-- <script src="{{asset('admin/js/jquery.validate.min.js')}}"></script>
    <script src="{{asset('admin/js/admin-custom.js')}}"></script> --}}

    <script>
        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            }
        });
    </script>

    @yield('script')
</body>
<!-- END: Body-->

</html>
