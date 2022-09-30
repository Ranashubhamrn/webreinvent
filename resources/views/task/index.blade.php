@extends('layouts.app')
@section('content')
    <div id="page" style="display: none" class="row">
        <div class="col-12">
            <div class="card">
                <div class="card-header">

                    <h4 class="card-title">Tasks </h4>
                    <input class="form-control col-10" id="name" type="text" placeholder="Project # To Do">
                    <a id="add-task" class="btn btn-primary text-white float-right">Add
                    </a>

                </div>
                <div class="card-content">

                    <div class="card-body card-dashboard">
                        <div class="table-responsive">
                            <table class="table zero-configuration no-wrap no-padding">
                                <thead>
                                    <tr>
                                        <th><input id="check_all" type="checkbox"> Show all tasks</th>
                                        <th>S.no</th>
                                        <th>Project Name </th>
                                        <th>Status </th>

                                        <th>Action</th>

                                    </tr>
                                </thead>
                                <tbody id="tasks">




                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
@section('script')
    <script>
        $(document).ready(function() {
            $('#get-task').click(function(event) {
                $("#page").show();
                getTask();
            });

            $(document).on('click', '.delete', function() {
                var id = $(this).attr('del-id');
                if (confirm('Are you sure want to delete this task')) {

                    $.ajax({
                        url: "/task-destroy/" + id,
                        method: "DELETE",
                        success: function(result) {
                            if (result.success) {
                                getTask();
                            }

                        }
                    });
                }
            });
            $(document).on('click', '#add-task', function() {
                var name = $("#name").val();
                if (!name) {
                    alert("Please enter Task");
                    return;
                }


                $.ajax({
                    url: "/task-store",
                    method: "POST",
                    data: {
                        name: name
                    },
                    success: function(result) {
                        if (result.success) {
                            getTask();
                        }

                    },
                    error: function(result) {
                        alert(result.responseJSON.message)

                    }
                });

            });
            $(document).on('click', '#check_all', function() {
                var check = $(this).is(":checked")
                if (check) {
                    getTask(1);
                } else {
                    getTask();
                }
            })
            $(document).on('click', '.check-task', function() {
                var id = $(this).attr("task-id");
                $.ajax({
                    url: "/task-complete",
                    method: "POST",
                    data: {
                        id: id
                    },
                    success: function(result) {
                        if (result.success) {
                            getTask();
                        }

                    },
                    error: function(result) {
                        alert(result.responseJSON.message)

                    }
                });

            })

            function getTask(all = 0) {
                if(all==0){
                  $('#check_all').prop('checked', false);
                }
                $.ajax({
                    url: "/get-task",
                    method: "GET",
                    data: {
                        all: all
                    },
                    success: function(result) {
                        if (result.success) {
                            var html = "";
                            result.tasks.forEach(task => {
                                var status = '<span style="color:yellow">Pending</span>';
                                var check = '';
                                if (task.status == 1) {
                                    status = '<span style="color:green">Completed</span>';
                                    check = 'checked disabled';
                                }
                                html += '<tr>' +
                                    '<td><input class="check-task" task-id="' + task.id + '" ' +
                                    check + ' type="checkbox"></td>' +
                                    '<td>' + task.id + '</td>' +
                                    '<td>' + task.project_name + '</td>' +
                                    '<td>' + status + '</td>' +
                                    '<td> <a class="delete" del-id="' + task.id +
                                    '" style="color:red"><i class="fa fa-trash" style="font-size:18px"></i></a></td>' +
                                    '</tr>';

                            });
                            $("#tasks").html(html);




                        }
                    }
                });
            }


        });
    </script>
@endsection
