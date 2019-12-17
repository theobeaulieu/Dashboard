function delete_widget(id_widget) {
    var div = document.getElementById(id_widget);
    div.style.display = "none";
    $.get('/cookieclear', {idTime: id_widget}, function (value) {
    })
}