function display_good_modal_settings(model, id) {
    document.getElementById('old_widget_id').innerHTML = 'id_' + id;
    document.getElementById(model).style.display = 'block';
}

function delete_old_widget() {
    var id_old_widget = document.getElementById('old_widget_id').innerHTML;
    delete_widget(id_old_widget);
}

function close_all_modal() {
    document.getElementById("money_widget").style.display = 'none';
    document.getElementById("weather_widget").style.display = 'none';
    document.getElementById("spotify_widget").style.display = 'none';
    document.getElementById("facebook_widget").style.display = 'none';
    document.getElementById("github_widget").style.display = 'none';
    document.getElementById("google_widget").style.display = 'none';
}

function new_setting_widget(model) {
    var id_old_widget = document.getElementById('old_widget_id').innerHTML;
    var my_div_add = document.getElementById(id_old_widget);
    if (model == "converter") {
        document.getElementById("money_widget").style.display = 'none';
        cur_src = document.getElementById("new_currencySrc").value;
        cur_dest = document.getElementById("new_currencyDest").value;
        d = new Date();
        id_time = d.getTime();
        $(my_div_add).before('<div class="wrap-login100 margin-container" id="id_' + id_time + '"><button style="padding-left: 10px" type="button" class="close" title="Delete" onclick="delete_widget(\'id_' + id_time + '\')" aria-label="Close"><span title="Delete" aria-hidden="true" class="white-text">×</span></button><button class="close" type="button" data-toggle="modal" data-target="#modalSettings" onclick="display_good_modal_settings(\'money_widget\',\'' + id_time + '\')"><i class="fas fa-cog" style="margin-top: -2px;font-size: 14px;vertical-align: middle;"></i></button><p style="margin-bottom: 20px; color: #9478ff;">Money - Converter</p><p id="name_converter" style="margin-bottom: 20px; text-align: center;">' + cur_src + ' to ' + cur_dest + '</p><div class="wrap-input100 validate-input" style="margin-bottom: 20px;" ><input class="input100" type="text" id="quantity"></span></div><div class="moneyDisplay"><p id="result_' + id_time + '" style="text-align: center;"></p></div><div class="container-login100-form-btn"><div class="wrap-login100-form-btn"><div class="login100-form-bgbtn"></div><button class="login100-form-btn" value="convert" onclick="converter(\'' + cur_src + '\', \'' + cur_dest + '\', \'' + id_time + '\')">Converter</button></div></div></div>');
    }
    if (model == "weather_city") {
        document.getElementById("weather_widget").style.display = 'none';
        city_name = document.getElementById("new_city_name").value;
        d = new Date();
        id_time = d.getTime();
        weather_city(city_name, my_div_add)
    }
    if (model == "spotify_playlist") {
        document.getElementById("spotify_widget").style.display = 'none';
        numberOfPlaylist = document.getElementById("new_number_playlist").value
        spotify_artist(numberOfPlaylist, my_div_add)
    }
    if (model == "facebook_event") {
        document.getElementById("facebook_widget").style.display = 'none';
        nb_event = document.getElementById("new_number_event").value
        facebook_get_friends(nb_event, my_div_add)
    }
    if (model == "github_project") {
        document.getElementById("github_widget").style.display = 'none';
        subject = document.getElementById("new_github_project_id").value
        get_github_project(subject, my_div_add)
    }
    if (model == "google_widget") {
        document.getElementById("google_widget").style.display = 'none';
        input = document.getElementById("new_google_input").value
        get_google(input, my_div_add)
    }
    if (model == "outlook_widget") {
        document.getElementById("outlook_widget").style.display = 'none';
        input = document.getElementById("new_outlook_input").value
        get_outlook_events(input, my_div_add)
    }
    if (model == "outlook_mails_widget") {
        document.getElementById("outlook_mails_widget").style.display = 'none';
        input = document.getElementById("new_outlook_mails_input").value
        get_outlook_mails(input, my_div_add)
    }
    delete_old_widget();
}