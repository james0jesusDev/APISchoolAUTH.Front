﻿$(function () {
    getData();
    
});

function getData() {
    $("#lista").css("display", "");
    $("#editado").css("display", "none");
    
    $.ajax({
        type: "GET",
        url: "https://localhost:44382/api/Estudiantes",
        success: function (data) {
            $('#tableBody').empty();
            for (var i = 0; i < data.length; i++) {
                $('#tableBody').append('<tr><td>' + data[i].ID
                    + '</td><td>' + data[i].Apellido
                    + '</td><td>' + data[i].Nombre
                    + '</td><td>' + tratarFecha(data[i].FechaMatriculacion)
                    + '</td><td><input type="button" id="btnEditar" value="Edit" onclick="editarRegistro(' + data[i].ID + ')"/>'
                    + '</td><td><input type="button" id="btnBorrar" value="Delete" onclick="borrarRegistro(' + data[i].ID + ')"/>'
                    + '</td></tr>');

            }
        }
    })
}

function tratarFecha(fecha) {
    let d = fecha.split("-");
    let dat = d[2].substring(0, 2) + "/" + d[1] + "/" + d[0];
    return dat;
}

function borrarRegistro(id) {
    $.ajax({
        type: "DELETE",
        url: "https://localhost:44382/api/Estudiantes/" + id,
        contentType: "application/json; charset=utf-8",
        
        success: function (data) {
            getData();
        },
        error: function () {
            alert('error');
        }
        
    })
}

function editarRegistro(id) {
    $.ajax({
        type: "GET",
        url: "https://localhost:44382/api/Estudiantes/" + id,
        success: function (data) {
            $('#editAlumnoId').val(data.ID);
            $('#editAlumnoNombre').val(data.Nombre);
            $('#editAlumnoApellido').val(data.Apellido);
            $('#editAlumnoFecha').val(tratarFecha(data.FechaMatriculacion));
            $("#lista").css("display", "none");
            $('#editado').css("display", "");
        }
    })
}

function Guardar() {
    

    var id = $('#editAlumnoId').val();
    var nombre = $('#editAlumnoNombre').val();
    var apellido = $('#editAlumnoApellido').val();
    var fecha = $('#editAlumnoFecha').val();

    var estudiante = {
        ID: id,
        Apellido: apellido,
        Nombre: nombre,
        FechaMatriculacion: fecha
    };
    alert(estudiante.Nombre);

    $.ajax({
        type: "PUT",
        url: "https://localhost:44382/api/Estudiantes/" + estudiante.ID,
        //url: "https://localhost:44382/api/Estudiantes",
        data: JSON.stringify(estudiante),
        dataType: "json",
        contentType: "application/json;charset=utf-8",
        success: function (response) {
            alert(response.data);
            getData()
        }
    })
}