
window.onload = function refresh_view() {
    refresh()
}

function refresh() {
    var widget_list;
    var pos1;
    var pos2
    var name;
    var value;
    var idTime;
    var i = 0;
    $.get('/refresh', function (list) {
        widget_list = list;
        while (widget_list) {
            try {
                pos1 = widget_list.indexOf('"name":"') + 8;
                pos2 = widget_list.indexOf('"', pos1);
                name = widget_list.substring(pos1, pos2);
                pos1 = widget_list.indexOf('"value":"') + 9;
                pos2 = widget_list.indexOf('"', pos1);
                value = widget_list.substring(pos1, pos2);
                pos1 = widget_list.indexOf('"idTime":"') + 10;
                pos2 = widget_list.indexOf('"', pos1);
                idTime = widget_list.substring(pos1, pos2);
                check_name(name, value, idTime)
                widget_list = widget_list.substring(widget_list.indexOf("}") + 1, widget_list.length);
            } catch {
            }
        }
    })
}

function check_name(name, value, idTime) {
    var my_div_add = document.getElementById('add_widget_before');
    if (name == "converter") {
        cur_src = value.substring(0, value.indexOf("-"));
        cur_dest = value.substring(value.indexOf("-") + 1, value.length);
        d = new Date();
        id_time = d.getTime();
        $(my_div_add).before('<div class="wrap-login100 margin-container" id="id_' + id_time + '"><button style="padding-left: 10px" type="button" class="close" title="Delete" onclick="delete_widget(\'id_' + id_time + '\')" aria-label="Close"><span title="Delete" aria-hidden="true" class="white-text">×</span></button><button class="close" type="button" data-toggle="modal" data-target="#modalSettings" onclick="display_good_modal_settings(\'money_widget\',\'' + id_time + '\')"><i class="fas fa-cog" style="margin-top: -2px;font-size: 14px;vertical-align: middle;"></i></button><p style="margin-bottom: 20px; color: #9478ff;">Money - Converter</p><p id="name_converter" style="margin-bottom: 20px; text-align: center;">' + cur_src + ' to ' + cur_dest + '</p><div class="wrap-input100 validate-input" style="margin-bottom: 20px;" ><input class="input100" type="text" id="quantity"></span></div><div class="moneyDisplay"><p id="result_' + id_time + '" style="text-align: center;"></p></div><div class="container-login100-form-btn"><div class="wrap-login100-form-btn"><div class="login100-form-bgbtn"></div><button class="login100-form-btn" value="convert" onclick="converter(\'' + cur_src + '\', \'' + cur_dest + '\', \'' + id_time + '\')">Converter</button></div></div></div>');
        nbr = nbr + 1;
        var Cookie = {
            name: "wdg_" + nbr,
            type: "converter",
            value: cur_src + "-" + cur_dest,
            idTime: id_time
        }
        $.get('/cookieset', Cookie, function (data) {}, "JSON");
    }
    if (name == "weather_city") {
        weather_city(value, my_div_add)
    }
    if (name == "spotify_playlist") {
        spotify_artist(value, my_div_add)
    }
    if (name == "facebook_event") {
        facebook_get_friends(value, my_div_add)
    }
    if (name == "github_project") {
        get_github_project(value, my_div_add)
    }
    if (name == "google_widget") {
        get_google(value, my_div_add)
    }
    if (name == "outlook_widget") {
        get_outlook_events(value, my_div_add)
    }
    if (name == "outlook_mails_widget") {
        get_outlook_mails(value, my_div_add)
    }
        delete_widget(idTime)
}

function delete_widget(id_widget) {
    var div = document.getElementById(id_widget);
    try {
    div.style.display = "none";
    }
    catch {}
    $.get('/cookieclear', {idTime: id_widget}, function (value) {
    })
}