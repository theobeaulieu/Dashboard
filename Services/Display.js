function change_display(model) {
    // Display service div && display none widget div
    if (model == "service") {
        document.getElementById("widget_button").style.display = "none"
        document.getElementById("service_button").style.display = "block"
        document.getElementById("button_add_widget").style.display = "none"
        document.getElementById("widget_display").style.display = "none"
        document.getElementById("service_display").style.display = "flex"
    }
    // Display widget div && display none service div
    if (model == "widget") {
        document.getElementById("widget_button").style.display = "block"
        document.getElementById("service_button").style.display = "none"
        document.getElementById("button_add_widget").style.display = "block"
        document.getElementById("widget_display").style.display = "flex"
        document.getElementById("service_display").style.display = "none"
    }
}