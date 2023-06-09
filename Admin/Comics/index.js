var app = {
    backend: 'http://localhost:8080/comic',
    table : null,
    init: function(){
        if (!$.fn.DataTable.isDataTable('#comics')) {
            app.initDatatable('#comics');
        }
        $('#save').click(function(){
            app.save({
                idUsuario: $('#id').val(),
                tituloComic: $('#titulo').val(),
                descripcionComic: $('#descripcion').val(),
                numeroComic: $('#numero').val(),
                rutaImagen: $('#ruta').val(),
                estado: $('#rol').val(),
                Comentarios: $('#comentarios').val()

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
                {data: "idComic"},
                {data: "tituloComic"},
                {data: "descripcionComic"},
                {data: "numeroComic"},
                {data: "rutaImagen"},
                {data: "estado"},
                {data: "comentarios"}
            ],
            buttons: [
                {
                    text: 'Crear',
                    action: function(e, dt, node, config){
                        app.cleanForm();
                        $('#comicModal').modal();
                    }
                },
                
                {
                text: 'Editar',
                action: function(e, dt, node, config){
                    var data = dt.rows('.table-active').data()[0];
                    app.setDataToModal(data);
                    $('#comicModal').modal();
                }},
                 {
                    text : 'Eliminar',
                    action: function(e, dt, node, config){
                        var data = dt.rows('.table-active').data()[0];
                        if(confirm('Desea eliminar el comic?')){
                            app.delete(data.id);
                        }
                    }
                }
            ]
        });
        $('#comics tbody').on('click', 'tr', function(){
            if ($(this).hasClass('table-active')){
                $(this).removeClass('table-active');
            } else {
                app.table.$('tr.table-active').removeClass('table-active');
                $(this).addClass('table-active');
            }
        });
    },

    setDataToModal: function (data){
        $('#id').val(data.idComic);
        $('#titulo').val(data.tituloComic);
        $('#descripcion').val(data.descripcionComic);
        $('#numero').val(data.numeroComic);
        $('#ruta').val(data.rutaImagen);
        $('#estado').val(data.estado);
        $('#comentarios').val(data.Comentarios);
    },
    cleanForm: function(){
        $('#id').val('');
        $('#titulo').val('');
        $('#descripcion').val('');
        $('#numero').val('');
        $('#ruta').val('');
        $('#estado').val('');
        $('#comentarios').val('');
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
                $('#comicModal').modal('hide');
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
