var app = {
    backend: 'http://localhost:8080/usuario',
    table : null,
    init: function(){
        if (!$.fn.DataTable.isDataTable('#personas')) {
            app.initDatatable('#personas');
        }
        $('#save').click(function(){
            app.save({
                idUsuario: $('#id').val(),
                nombres: $('#nombres').val(),
                apellidos: $('#apellidos').val(),
                correo: $('#correo').val(),
                password: $('#password').val(),
                rol: $('#rol').val()

            })

        });
    },
    initDatatable: function(id){
        app.table = $(id).DataTable({
            ajax: {
                url: app.backend + '/buscar',
                dataSrc: function(json){
                    return json;
                }
            },
            dom: 'Bfrtip',
            columns: [
                {data: "idUsuario"},
                {data: "nombres"},
                {data: "apellidos"},
                {data: "correo"},
                {data: "password"},
                {data: "rol"},
            ],
            buttons: [
                {
                    text: 'Crear',
                    action: function(e, dt, node, config){
                        app.cleanForm();
                        $('#personaModal').modal();
                    }
                },
                
                {
                text: 'Editar',
                action: function(e, dt, node, config){
                    var data = dt.rows('.table-active').data()[0];
                    app.setDataToModal(data);
                    $('#personaModal').modal();
                }},
                 {
                    text : 'Eliminar',
                    action: function(e, dt, node, config){
                        var data = dt.rows('.table-active').data()[0];
                        if(confirm('Desea eliminar al usuario?')){
                            app.delete(data.id);
                        }
                    }
                }
            ]
        });
        $('#personas tbody').on('click', 'tr', function(){
            if ($(this).hasClass('table-active')){
                $(this).removeClass('table-active');
            } else {
                app.table.$('tr.table-active').removeClass('table-active');
                $(this).addClass('table-active');
            }
        });
    },
    setDataToModal: function (data){
        $('#id').val(data.idUsuario);
        $('#nombres').val(data.nombres);
        $('#apellidos').val(data.apellidos);
        $('#correo').val(data.correo);
        $('#correo').val(data.correo);
        $('#rol').val(data.rol);
    },
    cleanForm: function(){
        $('#id').val('');
        $('#nombres').val('');
        $('#apellidos').val('');
        $('#correo').val('');
        $('#correo').val('');
        $('#rol').val('');
    },
    save: function(data) {
        $.ajax({
            url: app.backend + '/guardar',
            data : JSON.stringify(data),
            method: 'POST',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success : function(json){
                $('#msg').text('guardado exitosamente!!');
                $('#msg').show();
                $('#personaModal').modal('hide');
                app.table.ajax.reload();
            }, 
            error : function(error){
                $('#msg').text(error.error);
                $('#msg').show();
            }
        })
    },
    delete: function(id){
        $.ajax({
            url: app.backend + '/eliminar/'+id,
            method: 'GET',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            success : function(json){
                $('#msg').text('Eliminado exitosamente!!');
                $('#msg').show();
                app.table.ajax.reload();
            }, 
            error : function(error){
                $('#msg').text(error.error);
                $('#msg').show();
            }
        })
    }
};

$(document).ready(function () {
    app.init();
});

