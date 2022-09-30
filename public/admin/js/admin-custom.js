$(function (e) {
    applyJs("#js-main-content");
});

function applyJs(element) {
    var _this = $(element);

    _this
        .find("form.js-form-submit")
        .off("submit")
        .on("submit", function (event) {
            var _that = $(this);
            var $form = _that.closest(".js-form-submit");
            if ($form.valid()) {
                _that
                    .find(".js-submit-btn")
                    .attr("disabled", true)
                    .find("span")
                    .addClass("spinner-grow");

                _that.ajaxSubmit({
                    dataType: "json",
                    success: function (data) {
                        if (data.success) {
                            toastr.success(data.message);
                        } else {
                            toastr.error(data.message);
                        }

                        if (data.redirect_url) {
                            window.location = data.redirect_url;
                        }
                        if (data.popUpClose) {
                            $(data.popUpClose).modal("toggle");
                        }

                        if (data.items) {
                            _this.find(".js-data-list").html(data.items);
                            applyJs("#js-main-content");
                        }
                        _that
                            .find(".js-submit-btn")
                            .attr("disabled", false)
                            .find("span")
                            .removeClass("spinner-grow");
                    },
                    error: function (xhr, status, error) {
                        _that
                            .find(".js-submit-btn")
                            .attr("disabled", false)
                            .find("span")
                            .removeClass("spinner-grow");
                        var statusCode = xhr.status;
                        if (statusCode === 419) {
                            toastr.error(
                                "Your session has been expired, Please try again."
                            );
                            window.location.href = window.location;
                        }

                        var json = $.parseJSON(xhr.responseText);
                        var errorsHtml = "";
                        if (json.errors) {
                            errorsHtml = "<ul>";

                            $.each(json.errors, function (key, value) {
                                errorsHtml += "<li>" + value + "</li>"; //showing only the first error.
                            });
                            errorsHtml += "</ul>";
                        } else if (json.error) {
                            errorsHtml = json.error;
                        } else {
                            errorsHtml = json.message;
                        }

                        toastr.error(errorsHtml);
                    },
                    onComplete: function () {
                        _that
                            .find(".js-submit-btn")
                            .attr("disabled", false)
                            .find("span")
                            .removeClass("spinner-grow");
                    },
                });

                event.preventDefault();
            } else {
                if ($form.attr("id") == "register") {
                    $("#customCheck1").closest("div").find(".error").hide();
                    $("#customCheck2").closest("div").find(".error").hide();
                    checkconditioins();
                }
            }

            event.preventDefault();
        });

    _this
        .find(".js-filter")
        .off("click")
        .on("click", function (e) {
            var _that = $(this);
            var _form = _that.closest("form");
            var url = _form.attr("action");
            var data = _form.serialize();
            var replace_object = ".js-data-list";

            var params = [];
            params["url"] = url;
            params["that"] = _that;
            params["this"] = _this;
            params["data"] = data;
            params["replace_object"] = replace_object;
            params["hide_loader"] = true;

            _this.find(".js-loader").show().addClass("spinner-loader-class");

            postRequestFilter(params);

            applyJs("#js-main-content");
        });

    _this
        .find(".js-task-action")
        .off("click")
        .on("click", function (e) {
            var _that = $(this);

            if (_that.hasClass("js-task-action")) {
                var taskAction = confirm("You are going perform task action");
                if (taskAction) {
                    var _form = _that.closest("form");
                    var url = _form.attr("action");
                    var data =
                        _form.serialize() + "&task_submit_action=" + true;
                    var replace_object = ".js-data-list";

                    var params = [];
                    params["url"] = url;
                    params["that"] = _that;
                    params["this"] = _this;
                    params["data"] = data;
                    params["replace_object"] = replace_object;
                    params["hide_loader"] = true;

                    _this
                        .find(".js-loader")
                        .show()
                        .addClass("spinner-loader-class");

                    postRequestFilter(params);

                    applyJs("#js-main-content");
                } else {
                    return false;
                }
            }
        });

    _this
        .find(".js-pagination-offset")
        .off("change")
        .on("change", function (e) {
            var _that = $(this);
            var _form = _that.closest("form");
            _this.find(".js-order").find("i").remove();
            _this.find(".js-filter").click();
        });

    _this
        .find(".js-reset-filter")
        .off("click")
        .on("click", function (e) {
            var _that = $(this);
            // var _form = _that.closest('form');
            var _form = _that
                .closest(".filter-section")
                .find(".js-filter")
                .closest("form");

            _this.find(".js-order").find("i").remove();
            $(".select2").val(null).trigger("change");
            _form[0].reset();
            _this.find(".js-filter").click();
        });

    _this
        .find(".pagination a")
        .off("click")
        .on("click", function (e) {
            var _that = $(this);
            var paginationUrl = _that.attr("href");
            var page = paginationUrl.split("page=")[1];

            var replace_object = ".js-data-list";
            var _form = _this.find(".js-filter").closest("form");
            if (_form.length) e.preventDefault();
            var data = _form.serializeArray();

            var activeOrderBy = _this.find(".order-column").find("th").has("i");
            if (activeOrderBy.length) {
                var orderBy = activeOrderBy.attr("data-order-by");
                var order = activeOrderBy.attr("data-order");
                order = order === "asc" ? "desc" : "asc";
                data.push({ name: "order_by", value: orderBy });
                data.push({ name: "order", value: order });
            }

            var url = _form.attr("action") + "?page=" + page;

            var params = [];
            params["url"] = url;
            params["that"] = _that;
            params["this"] = _this;
            params["data"] = data;
            params["replace_object"] = replace_object;
            params["hide_loader"] = true;
            _this.find(".js-loader").show().addClass("spinner-loader-class");
            postRequestFilter(params);
            applyJs("#js-main-content");
        });

    _this
        .find("#state_id, #district_id, #city_id")
        .on("select2:select", function (e) {
            var _that = $(this);
            var url = _that.data("url");
            var id = _that.val();
            // console.log(typeof(url));
            if (typeof url !== "undefined" || id != "") {
                $.ajax({
                    type: "POST",
                    url: url,
                    data: {
                        id: id,
                    },
                    success: function (response) {
                        _this.find(response.replace_object).html(response.data);
                    },
                });
            }
        });

    _this.find("#school_id, #parent_id").select2({
        width: "100%",
        ajax: {
            delay: 250,
            url: function (params) {
                return $(this).data("url");
            },
            data: function (params) {
                var query = {
                    name: params.term,
                };
                // Query parameters will be ?search=[term]&type=public
                return query;
            },
            processResults: function (data) {
                // Transforms the top-level key of the response object from 'items' to 'results'
                return {
                    results: data.items,
                };
            },
        },
    });

    _this
        .find(".showDocument")
        .off("click")
        .on("click", function (e) {
            var _that = $(this);
            var documentList = _that
                .closest("tr")
                .find(".document-required")
                .html();
            var documentModel = $("#documentModel");
            documentModel.find(".modal-body").html(documentList);
        });
    _this
        .find(".showChildren")
        .off("click")
        .on("click", function (e) {
            var _that = $(this);
            var chilList = _that.closest("tr").find(".child-list").html();
            var documentModel = $("#childModel");
            documentModel.find(".modal-body").html(chilList);
        });
    _this
        .find(".reject-model")
        .off("click")
        .on("click", function (e) {
            var _that = $(this);
            var application_id = _that.data("application_id");
            // console.log(application_id);
            $("#application_id").val(application_id);
        });
    _this
        .find(".js-filter-export")
        .off("click")
        .on("click", function (e) {
            var _that = $(this);
            var url = _that.data("url");
            var fileName = _that.data("filename");
            var _form = _that.closest("form")[0];
            var filterForm = new FormData(_form);
            $.ajax({
                type: "post",
                url: url,
                data: filterForm,
                xhrFields: {
                    responseType: "blob",
                },
                contentType: false,
                processData: false,
                beforeSend: function () {
                    _that
                        .attr("disabled", true)
                        .find("span")
                        .addClass("spinner-grow");
                },
                success: function (data) {
                    _that
                        .attr("disabled", false)
                        .find("span")
                        .removeClass("spinner-grow");
                    var a = document.createElement("a");
                    var url = window.URL.createObjectURL(data);
                    a.href = url;
                    a.download = fileName;
                    document.body.append(a);
                    a.click();
                    a.remove();
                    window.URL.revokeObjectURL(url);
                },
                error: function (xhr, status, error) {
                    _that
                        .attr("disabled", false)
                        .find("span")
                        .removeClass("spinner-grow");
                    toastr.error(xhr.statusText);
                },
                onComplete: function () {
                    _that
                        .attr("disabled", false)
                        .find("span")
                        .removeClass("spinner-grow");
                },
            });
        });
}

function postRequestFilter(arr) {
    var url = arr["url"];
    var data = arr["data"];
    var _this = arr["this"];
    var that = arr["that"];
    var replace_object = arr["replace_object"];
    var replace_text = arr["replace_text"];
    var replace_over = arr["replace_over"];
    var hide_loader = arr["hide_loader"];
    $.ajax({
        cache: false,
        type: "POST",
        url: url,
        data: data,
        success: function (response) {
            if (response.status) {
                if (response.message) {
                    showNotification({
                        msg: response.message,
                        type: "success",
                    });
                }

                if (replace_over == "before") {
                    _this.find(replace_object).before(response.data);
                } else {
                    _this.find(replace_object).html(response.data);
                }
                if (replace_text) {
                    that.text(replace_text);
                }
            } else {
                _this.find(replace_object).html(response);
            }

            if (hide_loader) {
                _this
                    .find(".js-loader")
                    .hide()
                    .removeClass("spinner-loader-class");
            }

            applyJs("#js-main-content");
        },
        error: function (xhr, textStatus, errorThrown) {
            obj = JSON.parse(xhr.responseText);
            if (replace_text) {
                that.text(replace_text);
            }
            if (obj) {
                showNotification({ msg: obj.message, type: "danger" });
                //err.message show error message notification
            }
        },
    });
}
function showNotification(options) {
    var toastHTML = options.msg;
    // toastr.success(toastHTML);
}
$(document).ready(function () {
    $(".open-order-items")
        .off("click")
        .on("click", function () {
            var order_url = $(this).data("url");
            $.ajax({
                url: order_url,
                type: "get",
                beforeSend: function () {
                    $(".spinner-border").css("display", "block");
                },
                success: function (response) {
                    $("#show_order_items").html("");
                    $("#show_order_items").html(response.html);
                    $(".spinner-border").css("display", "none");
                },
                error: function () {
                    $(".spinner-border").css("display", "none");
                },
            });
        });

    $(".open-order-status")
        .off("click")
        .on("click", function () {
            $(".modal-body select").val($(this).data("order-status"));
            $(".modal-body #order_id").val($(this).data("order-id"));
        });

    $("#old_password_display, #new_password_display, #confirm_password_display")
        .off("click")
        .on("click", function () {
            password = $(this).parent(".form-group").find("input");
            const type =
                password.attr("type") === "password" ? "text" : "password";
            password.attr("type", type);
        });

    $("#update_order_status").submit(function (event) {
        var status = $("#status").val();
        if (
            status == "delivered" &&
            confirm("Are you sure you want to change  delivered status!") ==
                true
        ) {
            return true;
        }
        if (status != "delivered") {
            return true;
        }
        return false;
    });

    $("#tax").keypress(function (event) {
        var $this = $(this);
        if (
            (event.which != 46 || $this.val().indexOf(".") != -1) &&
            (event.which < 48 || event.which > 57) &&
            event.which != 0 &&
            event.which != 8
        ) {
            event.preventDefault();
        }

        var text = $(this).val();
        if (event.which == 46 && text.indexOf(".") == -1) {
            setTimeout(function () {
                if (
                    $this.val().substring($this.val().indexOf(".")).length > 3
                ) {
                    $this.val(
                        $this.val().substring(0, $this.val().indexOf(".") + 3)
                    );
                }
            }, 1);
        }

        if (
            text.indexOf(".") != -1 &&
            text.substring(text.indexOf(".")).length > 2 &&
            event.which != 0 &&
            event.which != 8 &&
            $(this)[0].selectionStart >= text.length - 2
        ) {
            event.preventDefault();
        }
    });

    $("#tax").bind("paste", function (e) {
        var text = e.originalEvent.clipboardData.getData("Text");
        if ($.isNumeric(text)) {
            if (
                text.substring(text.indexOf(".")).length > 3 &&
                text.indexOf(".") > -1
            ) {
                e.preventDefault();
                $(this).val(text.substring(0, text.indexOf(".") + 3));
            }
        } else {
            e.preventDefault();
        }
    });

    $("#tax").keyup("click", function () {
        if ($(this).val() >= 100) {
            $(this).val(99.99);
        }
    });

    $("#rating").keyup("click", function () {
        if ($(this).val() > 5) {
            $(this).val(4.9);
        }
    });

    $("#rating").keypress(function (event) {
        var $this = $(this);
        if (
            (event.which != 46 || $this.val().indexOf(".") != -1) &&
            (event.which < 48 || event.which > 57) &&
            event.which != 0 &&
            event.which != 8
        ) {
            event.preventDefault();
        }

        var text = $(this).val();
        if (event.which == 46 && text.indexOf(".") == -1) {
            setTimeout(function () {
                if (
                    $this.val().substring($this.val().indexOf(".")).length > 3
                ) {
                    $this.val(
                        $this.val().substring(0, $this.val().indexOf(".") + 3)
                    );
                }
            }, 1);
        }

        if (
            text.indexOf(".") != -1 &&
            text.substring(text.indexOf(".")).length > 2 &&
            event.which != 0 &&
            event.which != 8 &&
            $(this)[0].selectionStart >= text.length - 2
        ) {
            event.preventDefault();
        }
    });

    $(".show_restaurant_image")
        .off("click")
        .on("click", function () {
            var data_src = $(this).data("src");
            $(".restaurant-image").removeAttr("src");
            $(".restaurant-image").attr("src", data_src);
        });
});
$(window).on("load", function () {
    $("#state_id").select2().trigger("change");
});
